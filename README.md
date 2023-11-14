## REFERENCE

uid=User.\_id [from token]  
sid=Session.\_id [from token]  
pid=Profile.\_id  
did=Day.\_id  
tid=Task.\_id  
prid=Project.\_id

## API

- /api/register [post] {username,password }
- /api/login [post] {username,password}
- /api/activate [post] {uid}
- /api/profile [get] {uid}
- /api/day [get] {did,pid}
  - if(id==NULL) then create a new DayModel and push it into profile.days[] and return day
  - else return day
