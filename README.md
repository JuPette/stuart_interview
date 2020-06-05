
## How to start the API
Clone this repo to your machine.

Run
```bash
npm install
```
to install dependencies.

The database is running on postgres instance. You can change the config endpoint to match with yours in: 
`/config/config.json`

The database name is `courier` so you should create this db before running other commands.
Inside your postgres terminal, run:
```sql
CREATE DATABASE courier;
```

Once created you just have to run the next commands in the root folder:
```
npx sequelize db:migrate
``` 
It will execute the migrations listed in `/migrations` folder in order to create the schemas.

Then finally, run: 
```
node index.js
```

If all went correclty you should see a log telling you the connection to the database has been established :)

## About the API

I made a REST API, to complete this test. It was for me the easiet and cleanest way to do this. I use sequelize as an orm to manage the db.
So basically, we have 2 models: courier and vehicle

Courier table: 
```js
 {
  firstname: string,
  lastname: lastname,
  is_currently_racing: boolean,
 }
```

Vehicle table: 
```js
  {
    max_capacity: integer,
    current_capacity_remaining: integer
  }

```

Tables are linked to each other: 
Courier hasOne vehicle
Vehicle belongsTo courier

## Routes

To create a courier: 
```bash
PUT
http://localhost:3200/couriers
```
Body:
```json
  {
    "firstname": "Julien",
    "lastname": "Picard"
  }
```

To create a vehicle:
```
PUT
http://localhost:3200/vehicles
```
Body:
```json
  {
    "max_capacity": 500,
    "courierId": 1
  }
```

List couriers with a given wanted capacity remaining: 
```
GET
http://localhost:3200/couriers?capacity={your_wanted_capacity}
```

Update current capacity of a vehicle:
```
POST
http://localhost:3200/vehicles/:vehicleId
```
Body:
```js
  {
    "capacity": 20
  }
  //Or
  {
    "capacity": -20
  }

```

## Next Steps
If i had more time what would I do ? 
- Build an other table `Races` linked to a Courier, to be able to manage races conditions and have the details on current race of the courier and also the past one.
- Improve message returning by the API, in case of bad request. It takes some time to do it well but it is very convenient for users.
- Write test. I saw that you love TDD, unfortunatly It's been a while I didn't write test and I'm not comfortable with this for the moment. 
So to respect the delay of your exercise I prefered not to write something I would have difficulties to explain.
But its definitly something I want to improve in my coding skills.
- Same idea for TypeScript, I don't use it at work etc... but would love to use it in the close future, sounds awesome !

## Difficulties encountered
The excercise was quite clear and simple, the difficulties was to know how to organize the all thing.
- I had some hard times with Sequelize and the associations of my tables, for some reasons its created me some unwanted duplicate.
- I tried at first to create a AWS instance of postgres in order to be easier for you to launch the app, but I never managed to connect the instance with my app :(
- It tooks me approximatly 3 hours to complete the test (excluding the time to write the read.me)

I hope you enjoy it, and I can't wait to discuss about what you think of it and how could it have been better according to you :)

Best regards,

Julien


