const Navbar = {
    hideOnScroll: true,
    title: 'CSlant',
    logo: {
        alt: 'CSlant Logo',
        src: 'img/cslant-logo.svg',
    },
    items: [
        {
            docId: 'index',
            label: 'Our Website',
            to: 'https://cslant.com',
            position: 'left',
        },
        {
            label: "Blog API",
            position: "left",
            to: "/docs/category/blog-api",
        },
        
        {
            href: 'https://github.com/cslant',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub organization',
        },
    ],
};

export default Navbar;
