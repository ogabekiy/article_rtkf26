import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
    reducerPath: "articleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://mustafocoder.pythonanywhere.com",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Token ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/auth/login/",
                method: "POST",
                body,
            }),
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: "/auth/signup/",
                method: "POST",
                body,
            }),
        }),
        getUser: builder.query({
            query: () => "/auth/user/",
        }),
        createArticle: builder.mutation({
            query: ({ body }) => ({
                url: "/api/articles/create/",
                method: "POST",
                body,
            }),
        }),
        deleteArticle: builder.mutation({
            query: (id) => ({
                url: `/api/articles/${id}/delete/`,
                method: "DELETE",
            }),
        }),
        updateArticle: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/articles/${id}/update/`,
                method: "PUT",
                body: formData,
            }),
        }),
        getArticles: builder.query({
            query: () => "/api/articles/",
        }),
        getSingleArticle: builder.query({
            query: (id) => `/api/article/${id}/`,
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useGetUserQuery,
    useCreateArticleMutation,
    useDeleteArticleMutation,
    useUpdateArticleMutation,
    useGetArticlesQuery,
    useGetSingleArticleQuery,
} = articlesApi;
