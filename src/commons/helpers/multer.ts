import { extname } from "path";

// function 1 : file filter (lazem at2kd eno msln jpg, png, ..)
export const filterFile = (req,file,cb) =>{
    if(!file.originalname.match(/\.(jpg|png|jpeg)$/) ){ // REGEX
        return cb(new Error('only image files are allowed'));
    }

    cb(null,true);
}

// function 2 : handle file name (lazemm t3ml lel name filter w tlz2oo, 3shan lw msmy sora "andrew 2" msln, elURL msh by2bl msafat)
//              w lazem a5leeh unique
// mol5s el Function -> ha5od el filename(andrew.jpg) afsloo w a7ot fe elNos(ben elName w el.jpg) RandomString 3shan yb2a unique w agm3o tany
// andrew.jpg -> andrewasdf.jpg
// Remember: kont fe elMongooo b7ot 3leh el _id 3shan yb2a unique

export const handleFileName = (req,file,cb)=> {
    //let filename = file.originalname.split('.')[0].split(' ').join(''); // 3shan tlz2 fe b3d (msh lzaem mmkn spaces 3ady)
    let filename = file.originalname.split('.')[0].replace(/ /g, ''); // fastest
    /*
        3shan a5od el filename without extension
        el split btfsl el string le array , w hena 3amel elSplit bel .
        y3ni m3 koll . , efsl w 7pt fe elArray , hena ana 3ayz awl el
        andrew1img.jpg -> andrew1img
    */

    let fileExtention = extname(file.originalname);

    let randomString = Array(4).fill(null).map(()=>{  // b3ml array of 4 w amlaha b random numbers , w a7wlha string b3d kda
        return Math.round(Math.random()*16).toString(16);    // aw shoof ay tare2a le 3ml random string
    }).join('');

    cb(null , `${filename}-${randomString}${fileExtention}`);



    // drake-1122.jpg 

}