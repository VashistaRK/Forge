export default {
  routes: [
    {
      method: "GET",
      path: "/contact/file-count",
      handler: "contact.fileCount",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/contact/send-email",
      handler: "contact.sendEmail",
      config: {
        auth: false,
      },
    },
  ],
};
