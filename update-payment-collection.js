const request = require('request')

exports.main = async (event, callback) => {
 
  const subId = event.inputFields['subscription_id'];
  
  
  const updateSubscription = async () => {
    
    var options = {
      'method': 'POST',
      'url': `https://api.stripe.com/v1/subscriptions/${subId}`,
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${process.env.brewing_sk}`
      },
      form: {
        'collection_method': 'charge_automatically',
        
      }
    };
   
    try{
        const updateSubscription = await request(options, async (error, response)=>{
          if (error){
            console.log(error)
             throw new Error(error)
          }
          response = JSON.parse(response.body)
          console.log(response)
          
          console.log("SubID:" + response.id)
          
          callback({
            outputFields: {
              collectionMethod: response.collection_method,
            }
          });
          return
        })
      }
      catch(e){
        console.log(e.data.message)
        throw new Error
      }
  }
  
  await updateSubscription();

}