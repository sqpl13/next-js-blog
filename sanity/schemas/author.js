export default {
  title: 'Author',
  name: 'author',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Bio',
      name: 'bio',
      type: 'text',
    },
    {
      title: 'Profile Image',
      name: 'profileImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // Add additional fields for social media links, website, etc., if desired
  ],
}
