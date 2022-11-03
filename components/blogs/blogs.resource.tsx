export interface BlogProps {
    blogID: number;
    blogImg: string;
    category: string;
    title: string;
    description: string;
    authorID: number;
    authorName: string;
    createdDate: string;
    authorImg: string;
}

export interface AuthorProps {
    authorID?: number;
    authorName?: string;
    authorCategory?: string;
    blogsNum?: number;
    speciality?: string;
    about?: string;
    authorImg?: string;
    facebookAccount?: string;
    instaAccount?: string;
    linkedInAccount?: string;
    twitterAccount?: string;
}