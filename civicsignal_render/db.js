// MySQL connection pool. Only loads mysql2 when MYSQL_HOST is set, so the hosted demo and tests run without it.
let pool=null;
function connect(config){if(!config.MYSQL_HOST)return null;let mysql;try{mysql=require('mysql2/promise')}catch{throw new Error('MYSQL_HOST is set but mysql2 is not installed. Run `npm install` in civicsignal_render/.')}pool=mysql.createPool({host:config.MYSQL_HOST,port:Number(config.MYSQL_PORT||3307),user:config.MYSQL_USER,password:config.MYSQL_PASSWORD,database:config.MYSQL_DATABASE,connectionLimit:5,waitForConnections:true});return pool}
async function status(){if(!pool)return'not configured';try{await pool.query('SELECT 1');return'connected'}catch{return'unavailable'}}
module.exports={connect,status,getPool:()=>pool};
