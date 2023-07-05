<p align='center'>
<img alt='loglo' src='https://resources.world.rugby/photo-resources/2021/06/02/24d18609-7981-4119-a787-d4fdbfdee195/Negative-on-a-blue-background.png?width=416&height=234'>
<p>

<h1 align='center'>Rugby Projet</h1>

<p align='center'>An open source seat reservation application for journalists during rugby matches</p>

<p align='center'>
<a href='#tech-stack'><strong>Tech Stack</strong></a> .
<a href='#runing-locally'><strong>Runing locally</strong></a> .
<a href='#authors'><strong>Authors</strong></a>
</p>
<br/>

## Tech Stack

- [Next.js](https://nextjs.org) framework
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://www.radix-ui.com) for headless component primitives
  - Icons from [React Icons](https://react-icons.github.io/react-icons)
- [Next Auth](https://next-auth.js.org/) for secure authentication
- Send emails with [Nodemailer](https://nodemailer.com/about)
- [React Hook Form](https://react-hook-form.com) for forms
- [Zod](https://zod.dev) for type safety
- Images stored on[Cloudinary](https://cloudinary.com)
- [Vitest](https://vitest.dev) for test
- global state management with[Zustand](https://zustand-demo.pmnd.rs)
- [Mongodb](https://www.mongodb.com/fr-fr) database
- [ESlint](https://eslint.org) for good practice

## Runing locally

You will need to use the environement variables [defined in `.env.example`](.env.example) to run Rugby Project. But for that, you have to rename the `.env.example` file in to `.env`.

```bash
npm i
npm run db
npm run dev
```
> npm i for install all dependencies
> 
> npm run db for delete the old database, generate client prisma types and recreate the database with default data
> 
> npm run dev for starte server

**Your app should now be running on [localhost:3000](http://localhost:3000/)**

## Authors

- Victor Huang ([@theVicoH](https://github.com/theVicoH))
- Abdramane Diarra ([@AbdeDev](https://github.com/AbdeDev))
- Vitomir Laces ([@vitolinho](https://github.com/vitolinho))
- Salma Wadouachi ([@wadouachi](https://github.com/wadouachi))
- Morgane Dassonville ([@Jun080](https://github.com/Jun080))
- Clément Phlipponneau ([@clementpnn](https://github.com/clementpnn))