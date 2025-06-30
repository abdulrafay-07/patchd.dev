"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateBio } from "@/features/profile/api/create-user-bio";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
import { UserProfile } from "@/lib/generated/prisma";

interface MiscFormProps {
  userId: string;
  profile: UserProfile;
};

export const MiscForm = ({
  userId,
  profile,
}: MiscFormProps) => {
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
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile", userId] })
      },
    });
  };

  return (
    <Card className="w-full gap-2">
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="ml-auto flex w-20 md:w-24 cursor-pointer"
              disabled={isPending}
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};
