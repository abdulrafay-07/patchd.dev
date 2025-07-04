"use client"

import { useEffect, useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateBio } from "@/features/profile/api/create-user-bio";

import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BicepsFlexed, DollarSign, MapPin } from "lucide-react";

import { bioSchema } from "@/schema";
import { UserProfileWithRelations } from "@/types";

interface MiscFormProps {
  userId: string;
  profile: UserProfileWithRelations;
};

export const MiscForm = ({
  userId,
  profile,
}: MiscFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { mutate, isPending } = useCreateBio();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof bioSchema>>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      tagline: profile.tagline,
      location: profile.location,
      revenue: profile.revenue,
      tag: profile.tag,
    },
  });

  const onSubmit = (data: z.infer<typeof bioSchema>) => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    };

    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["profile", userId] });
        setIsEditing(false);
      },
      onError: (data) => {
        toast.error(data.message);
      },
    });
  };

  useEffect(() => {
    if (!profile.location && !profile.tagline && !profile.revenue && !profile.tag) setIsEditing(true);
  }, [profile]);

  return (
    <Card className="w-full gap-4">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Bio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="i make software for fun"
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-x-1">
                      <MapPin className="size-4" />
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Mars"
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="revenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-x-1">
                      <DollarSign className="size-4" />
                      Revenue
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="6900"
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-x-1">
                      <BicepsFlexed className="size-4" />
                      Tag
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Vibe coding..."
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-end gap-x-2">
              {isEditing && (
                <Button
                  variant="outline"
                  className="w-20 md:w-24 cursor-pointer"
                  onClick={() => setIsEditing(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              )}
              <Button
                className="flex w-20 md:w-24 cursor-pointer"
                disabled={isPending}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};
