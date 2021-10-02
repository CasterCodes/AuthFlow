import express, {Router, Request, Response, NextFunction} from 'express';

const router: Router = express.Router();

interface Posts {
    posts:{
          title:string,
          author:string,
          body:string,
          id:string | number
    }[]
}


router.get('/', (req: Request, res: Response, next:NextFunction) => {
  let userPosts: Posts = {
      posts: [
      {
          title:"How to learn how to code",
          author:"Kevin Caster",
          body:'This is the best way to learn how to code',
          id:2344

      }
  ]
  };


 return res.status(200).json(userPosts.posts);
});


export default router;