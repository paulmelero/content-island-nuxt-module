export type About = {
  picture: {
    name: string
    link: string
  }
  id: string
  fullname: string
  shortBio: string
  extendedBio: string
}

export type Post = {
  id: string
  title: string
  date: string
  summary: string
  author: string
  content: string
  image: {
    name: string
    link: string
  }
}
