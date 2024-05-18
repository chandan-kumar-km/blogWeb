import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Rte as RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Postform({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => {
        return state.auth.userData
    });

    const onsubmit = async (data) => {
        if (post) {


            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                title:data?.title,
                content:data?.content,
                slug:data?.slug
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const dbPost = await appwriteService.createPost({...data,userId:userData.$id });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }

        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-wrap">
            <div className="w-full px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="my-5">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>



        </form>
    );
}