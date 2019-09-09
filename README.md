# example-clawler-itviec
Example clawler list companies from itviec
API Link : 
https://50001.trankyhoathanh.com

# API documents : 
Get by key      : https://50001.trankyhoathanh.com/companies/search?keysearch=fpt
Get all         : https://50001.trankyhoathanh.com/companies/all

# Construction
1. npm install
2. npm start 
3. open Postman => (POST) localhost:50001/clawler => run


# Edit to get all companies from IT VIEC
Find this code at 
Controller/defaultController.js

////////////////////////////////
// Hard this block to get ALL
// OPEN
if (requestCount > 5)
{
    continueRequest = false
}
//
// CLOSE
////////////////////////////////

Update readme