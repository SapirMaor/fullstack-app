const mongoose = require('mongoose')

const connection={}; // 0 = disconnect, 1 = connect

async function connect() {
  if(connection.isConnected){
    return;
  }
  const db = await mongoose.connect("mongodb+srv://sapirmaor2:sapdb11@cluster0.i6dcmha.mongodb.net/?retryWrites=true&w=majority");
  connection.isConnected = db.connections[0].readyState;
}

export default connect; 

