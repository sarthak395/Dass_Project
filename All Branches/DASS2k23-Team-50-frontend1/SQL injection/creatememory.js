const { pool } = require("./db");

async function createTable() {
//   const [name, color] = process.argv.slice(2);
// company,modelid,link,resolution,model_year,size_class,pixel_pitch,contrast_ratio,diagnol,brightness
  const res = await pool.query(
      "CREATE TABLE IF NOT EXISTS Memory (company VARCHAR(255), name TEXT PRIMARY KEY ,modelid VARCHAR(255), link VARCHAR(255),size VARCHAR(255),frequency VARCHAR(255) );"
    );
  console.log(`CREATED TABLE Memory`);
}

createTable();

/*
COPY Monitor(company , modelid , link , resoultion , model_year , size_class , pixel_pitch , contrast_ratio , diagnol , brightness)
FROM 'Monitor_data_webScrapped.csv'
DELIMITER ','
CSV HEADER; 
*/

