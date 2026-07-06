export const CSlantBlogConfig = {
    outputDir: "docs/blog",
    specPath: `${process.env.OPENAPI_DOCS_BLOG_URL}`,
    sidebarOptions: {
        groupPathsBy: "tag",
    },
};

export const CSlantDailyTipsConfig = {
    outputDir: "docs/daily-tips",
    specPath: `${process.env.OPENAPI_DOCS_DAILY_TIPS_URL}`,
    sidebarOptions: {
        groupPathsBy: "tag",
    },
};
