two manager for same department

employee count error - for deleting designation.

wrong password hit for admin  doesnt have any effect

new chat wont be apeared in recent chat unless refreshed - fix:move recetnchat.jsx int o chat.jsx

-----
for returning daily getdailyreports : 
Right now you're returning the entire Attendance document, including:

"_id"
"__v"
"updatedAt"

The frontend doesn't need all of that. Since this is a report API, it's cleaner to return only the fields you'll actually display or export.

refactor this 
------

in employee search - when i choose dpet finance - the designations shows all designation from different dept too- it should only be the designation from selected department only . 

--------
search and filteirnfg is done only dfro admin - manager needs that fucntionality too. 

------------
keep separate folder level styling file 
like - all chat module should have chat.css 
auth.css
admin.css
dashbaord.css
like that 
--------------