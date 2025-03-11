export const OpenApiSidebar = [
    {
        type: "category",
        label: "Blog",
        link: {
            type: "generated-index",
            title: "Blog API",
            description:
                "TopDev API is a robust and scalable API built using Laravel, a popular PHP framework known for its elegance and simplicity. The API is designed to provide a wide range of services and follows the principles of REST, ensuring that it's easy to use, stateless, and can be easily integrated into different applications.",
            slug: "/category/blog-api"
        },
        items: require("../../docs/blog/sidebar.js")
    },
]
