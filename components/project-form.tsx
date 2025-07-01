"use client"

import { useEffect } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateProject } from "@/features/profile/api/create-user-project";

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
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CircleDashed, CircleQuestionMark, DollarSign } from "lucide-react";

import { projectSchema } from "@/schema";
import { categoryOpts, statusOpts } from "@/constants";
import { useProjectModal } from "@/features/profile/hooks/use-project-modal";
import { authClient } from "@/lib/auth-client";
import { useGetProject } from "@/features/profile/api/get-project";
import { useUpdateProject } from "@/features/profile/api/update-user-project";

interface ProjectFormProps {
  onCancel?: () => void;
};

export const ProjectForm = ({
  onCancel,
}: ProjectFormProps) => {
  const { mutate: create, isPending: isCreating } = useCreateProject();
  const queryClient = useQueryClient();

  const { data: session } = authClient.useSession();
  const { id, close } = useProjectModal();
  const { data } = useGetProject({ id: id! });
  const { mutate: update, isPending: isUpdating } = useUpdateProject({ id: id! });

  const isLoading = isCreating || isUpdating;

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
      revenue: "",
      status: "",
      category: "",
      image: "",
    },
  });

  useEffect(() => {
    if (data?.project) {
      form.reset({
        name: data.project.name ?? "",
        url: data.project.url ?? "",
        description: data.project.description ?? "",
        revenue: data.project.revenue ?? "",
        status: data.project.status as string ?? "",
        category: data.project.category ?? "",
      });
    };
  }, [data, form, onCancel]);

  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    if (data) {
      update(values, {
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["profile", session?.user.id] });
          queryClient.invalidateQueries({ queryKey: ["project", data.project?.id] });
          close();
        },
        onError: (data) => {
          toast.error(data.message);
        },
      });
    } else {
      create(values, {
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["profile", session?.user.id] });
          close();
        },
        onError: (data) => {
          toast.error(data.message);
        },
      });
    };
  };

  return (
    <Card className="w-full gap-4">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          {id ? "Edit a" : "Add a new"} project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* TODO add image */}
            <div className="grid grid-cols-2 gap-x-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="patchd..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://patchd.dev"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      className="resize-none"
                      rows={2}
                      placeholder="patchd is an open source project that showcases developer profiles..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 md:gap-y-0">
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
                        // className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-x-1">
                      <CircleDashed className="size-4" />
                      Status
                    </FormLabel>
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOpts.map((status) => (
                          <SelectItem
                            key={status.name}
                            value={status.value}
                          >
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-x-1">
                      <CircleQuestionMark className="size-4" />
                      Category
                    </FormLabel>
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOpts.map((category) => (
                          <SelectItem
                            key={category.name}
                            value={category.value}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-x-2 justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-20 md:w-24 cursor-pointer"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex w-20 md:w-24 cursor-pointer"
                disabled={isLoading}
              >
                {id ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};
