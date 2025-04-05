const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const DbConnection=require('./database/db');
const listingRoutes=require('./routes/listingRouts');
const PORT=process.env.PORT || 8080;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1',listingRoutes); 



/*
const initdata = async () => {
  for (let i = 0; i < data.data.length; i++) {
    try {
      const doc = new Listing(data.data[i]);
      await doc.save();
      console.log(`Saved listing #${i + 1}`);
    } catch (err) {
      console.error(`❌ Error in listing #${i + 1}:`, err.message);
      console.log(data.data[i]);
    }
  }
}
initdata();
*/



app.listen(PORT,()=>{
  DbConnection();
  console.log(`Server is running on port ${PORT}`);
});


