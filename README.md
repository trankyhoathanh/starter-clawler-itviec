# example-clawler-itviec
Example clawler list companies from itviec

# Construction
1. npm install
2. npm start 
3. open Postman => (POST) localhost:30001/clawler => run


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