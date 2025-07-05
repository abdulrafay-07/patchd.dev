"use client"

import { useEffect, useRef, useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { useGetProject } from "@/features/profile/api/get-project";
import { useProjectModal } from "@/features/profile/hooks/use-project-modal";
import { useCreateProject } from "@/features/profile/api/create-user-project";
import { useUpdateProject } from "@/features/profile/api/update-user-project";

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
import { CircleDashed, CircleQuestionMark, DollarSign, ImageIcon, Upload, X } from "lucide-react";

import { ApiResponse } from "@/types";
import { projectSchema } from "@/schema";
import { authClient } from "@/lib/auth-client";
import { categoryOpts, statusOpts } from "@/constants";

interface ProjectFormProps {
  onCancel?: () => void;
};

export const ProjectForm = ({
  onCancel,
}: ProjectFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: create, isPending: isCreating } = useCreateProject();
  const queryClient = useQueryClient();

  const { data: session } = authClient.useSession();
  const { id, close } = useProjectModal();
  const { data } = useGetProject({ id: id });
  const { mutate: update, isPending: isUpdating } = useUpdateProject({ id: id! });

  const isLoading = isCreating || isUpdating || isUploading;

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  useEffect(() => {
    if (data?.project) {
      form.reset({
        name: data.project.name ?? "",
        url: data.project.url ?? "",
        description: data.project.description ?? "",
        revenue: data.project.revenue ?? "",
        status: data.project.status ?? undefined,
        category: data.project.category ?? undefined,
        image: data.project.image ?? "",
      });

      setImagePreview(data.project.image);
    };
  }, [data, form, onCancel]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    };
  };

  const handleRemoveImage = () => {
    if (data?.project?.image) {
      form.setValue("image", "");
    };

    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    };
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    if (data?.success) {
      if (imagePreview) {
        setIsUploading(true);
        // Upload image to cloudinary
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: imagePreview }),
        });

        const data = await res.json() as ApiResponse;
        if (!data.success) {
          toast.error("Error uploading the image");
          close();
          return;
        };

        form.setValue("image", data.url!);
        setIsUploading(false);
      };

      update(form.getValues(), {
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
      if (imagePreview) {
        setIsUploading(true);
        // Upload image to cloudinary
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: imagePreview }),
        });

        const data = await res.json() as ApiResponse;
        if (!data.success) {
          toast.error("Error uploading the image");
          close();
          return;
        };

        form.setValue("image", data.url!);
        setIsUploading(false);
      };

      create(form.getValues(), {
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
        <div
          className="relative w-full aspect-video rounded-lg border-2 border-dashed transition-colors cursor-pointer overflow-hidden mb-6 max-h-[250px]"
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Selected image"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick();
                    }}
                    className="cursor-pointer"
                  >
                    <Upload className="size-4" />
                    Change
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="cursor-pointer"
                  >
                    <X className="size-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6">
              <ImageIcon className="w-12 h-12 mb-4" />
              <div className="text-center">
                <p className="text-lg font-medium mb-2">
                  Select an image
                </p>
                <p className="text-sm mb-4">Drag and drop or click to browse</p>
                <p className="text-xs">
                  Supports: JPEG, JPG, PNG
                </p>
              </div>
            </div>
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        placeholder="https://patchd.vercel.app"
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
