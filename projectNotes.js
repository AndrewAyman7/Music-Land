// Music Land Project (Mohammed Qaderi)  Almost = SoundCloud & Chat & Notifis
// WoW , da hwa hwa elSoundCloud 100% + Chat + Notifis
// Nest , Postgres , Angular

// Why SQL Not MongoDB ? => because i need Relations

// Note: Nest with Fastify is much faster than Nest with Express

// Note: Why always const ?!! ,, leh msh b3ml let w var ??
//       => Better Performance, el js Engine msh bystna mnk reAssign , by7ot elFinal value directly w y2fl elMwdoo3

// Note : (Wow) in Relational DB (Postgre) -> enta msh m7tag 5ales msln t5osh table elsongs tgeeb koll elsongs el 5asa bel user de ..
//        enta once enk t3ml elRelations , btwfr 3lek koll da ..
//        once enk t3ml elRelation, by default hygblk m3 eluser el songs w elhaga el5asa beeh kolha

// Note: lma ykoon fe Relation 1-To-M -> awl haga ems7 elMany(Tracks) then ems7 el 1 (playlist)

//---------------------------------------------------------------------------------//
// Note: el Nest sahlaa awiii w momt3a..
// a7la mn elExpress bkteer , bs elQaderi da ms3bha 3shan msh monzm..
// erg3 ektb el3ady, zy Mohammed Essa
// Note : elVideos elTweela el 40 min wkda , kolhaa tafhaa , mta5odsh 5 min
//        w asln koll 3 4 videos wra b3d , kolohom nfs elCode bzbt copy paste
//---------------------------------------------------------------------------------//

//------------------------------------                        ---------------------------------------//
//------------------------------------  Videos from #1 - #29  ---------------------------------------//
//------------------------------------                        ---------------------------------------//


// user, artist , Musician"mue zetion" , Album , song , playlist , profile

// 2 Types ->  song(singer)  &  Music(Musician)  -> ay 1 fehom = Track in App ,,
//             w elUser by3ml Playlists bel Tracks de , so fe relation M-to-M ben el Playlist w (elSong,Music)
//             Kol Playlist mmkn ykon feha kza o8nya, w kol o8nya mmkn tkoon mwgoda fe kza playlist
//             But, el Relation ben el song w album -> 1-to-M (kol o8nya mwgoda fe album 1 bs tab3n)

// sa3at bsbb elTypeORM lma bykoon fe Relation M-to-M  ->  by2smha le 2 (1-to-M)
// Why ? ,, in TypeORM mynf3sh a3ml M-To-M Relation w custom properties
// y3nii el M-to-M de elMfrood elClass ykoon just id and foreignKeys
// lakn lw 3ayz msln fe elTrack a7ot props lel track , lazem t3mlha 1-to-m

// Damn it , its DataBase Basics ..
// lw 3ndy 1-To-M Relation -> b3ml elForeignKey w bs.. 
// w lw 3ndy M-To-M Relation -> lazem a3ml gdwl waseet feeh el PK bta3 da w el PK bta3 da , w el 2 3la b3d = FK ..
// y3ni hykoon 3ndy Table gdeed feeh el Pk w Pk 
// 1-to-m  -> 1 field related to multible fields (Primary key)
// m-to-m  -> multible fields related ro multible fields

// Lazemmmmm Tzaker DataBase , ana mbasmagha !!

// ka3daaaa .. ayyy M-To-M Relation = new table 


// Track ..
// efham , en elTrack da msh schema fe zatooo , y3ni mloosh table w properties ..
// elTrack da fe aslo hwa song or music ,, y3ni elO8nya de msh btb2a fe table esmo track .. de fe table el songs
// eh elTrack de ????? ,,  Track = just a relation !!
// t5ayl elSoundCloud , lma b3ml playlist traneem5 msln ,, lma bsh8l trnema fehom de = track fe elPlaylist
// laknn eltrneema nfshaa fe zatha = song (Table Songs)
// lakn lma bdefha fe elPlaylist byb2a esmha track ..
// track = userId , songId , playlistId (just a relation)
// elRelation msln ben elTrack w elPlaylist = M-To-M  (kol track mwgood fe aktr mn Playlist ,, w kol playlist feha aktr mn track)
// = BiDirectional Relation M-To-M  ...
// de tare2tha sahla , b3ml M-To-M relation fe el 2 tables w 5las @ManyToMany() , w b5le el field elRabet bnhom = array (3shan aktr mn o8nya)
// Butttt ,, lw enta 3ayez tedy el Track properties zyada , url msln (ywdeek 3l playlist ely feeha)
// kdaa enta lazem t3ml haga esmha -> Many-to-many relations with custom properties
// lazem a2sm el M-to-M relation into 2 relations 1-To-M & M-to-1
// htla2eha fe elDocs .. https://typeorm.io/many-to-many-relations

// Interaction between Relations (connect songs bel playlists w favList)
// Note: koll elT3amlo fe elPlaylists w elFavList htb2a bel Track , msh bel songs w musics ..
//       Track = Relation (listId + songId)

// Remember : (Rlations , M-To-M , Track)
// 1- any Relation M-To-M elResult bta3tha lazem tb2a new Table (tsheel el hagten aw aktr ely 3ayz arbthom mn el 2 Tables)
// 2- msh logic 5ales eny at3amel bel songId fe elPlaylist, y3ni ana lw 3ayz ams7 song mn playlist , hms7 el id bta3ha ,
//    hms7 el id bta3 elSong !! , = htms7 el Song
//    lma ams7 track , ytms7 5ales mn elDB -> Track(id - songId - playlistId) , ems7 elTrack, ems7 elRelation
// mn 1 - 2 : mantky eny lma a3ml relation M-To-M yb2a ana 3ayz a3ml 3laka ben field hena w field hena , fa elKlam da mynf3sh b 1 foreignKey
//            da ana 3ayz a5zn FK mn elTable elawlany w FK mn elTable eltany (el 2 fields) , 3shan dol fe benhom relation, 3ayzhom swa
//            fa el DB bt2oly lazem table gdeed -> ( id(PK) - songId(FK) - playlistId(FK) ) , w shya hagat tanya
// Remember : fe el DB ana bsawy entity b entity w elDB hya ely bt generate el FK
// y3ni msln : playlist.user = user; // will create foreignKey : userId , bos el playlistEntity elRealtion (bta5od el user w trg3 userId FK)
// y3nii ana lw 3ayz el FK yb2a Id , lazem asawy elField msh bel id , la da ana asweeh bel userEntity w hwa yrg3ly el Id
// -> track.song = song; -> will create songId ,, 

// dlw2ty el FavoriteList w el Playlist gwahom tracks , elTracks de gaya mn Table tany (Table Tracks) , tb ezay btgbha ?
/*
    @OneToMany(type => Track , t => t.favoriteList , {eager:true})
    tracks:Track[]; // htroo7 lel Tracks table w tgeeb elTracks ely elFavId bta3tha = el favloriteList de
*/

// so, add song to playlist = (songId + playlistId) = new row in DB Table = Track

// elTrack mlhash controller tab3n , ana msh 3ayz ay linkat 3l track (EndPoints)
// ana b Add Song msh track , w lma b5osh 3la track, hwa actually byroo7 3l Id bta3 elSong ely gwa elTrack (track.songId)

// 1- Make Modules (Make Folder Modules)
// Module for Auth , User , Profile , Musician , Artist , Music , .....
// nest g module modules/auth -> hy5osh gwa folder elModules y3mlk folder auth , gwah el ModuleAuth (hhy3mlk folder for each module)
// hyt3mlhom kolohm import automatically fe el AppModule

// 2- e3ml b2a elEntity bta3 kol module (Auth -> UserEntity) {username,id, ....} = Schema = Table

// Note : hst5dm fe el pass encryption (bcryptjs) not (bcrypt)

// enum .. Why Enum ??
// lma ykoon feeh field leeh msln 2 specific values (user-admin) ,, (male-female)
// fa ana b7ddha bel enum
// ana mmkn a3ml 3ady -> gender:string; ,, bs msh a7sn haga, ana 3ayz a7ddha anaa , tkoon mn type male or type female = (Type Gender)

// Difference between (User & Profile) ??
// leh a3ml table lel user w table lel profile ?!
// 2 Ways -> (1) ya ema t3ml zy ma3mlt msln fe el Blog app w el GP (en kolo fe table 1 esmo user) , w koll elData mwgoda feeh ,,
//                   w lma a5osh elProfile , ageeb elData bta3et elUser da ..
//           (2) ya ema (zy elProject da) t3ml 2 tables , table lel User (5as bel Auth process) ykoon feh el username w email w passwod
//                   w a3ml fe elClass kman 3mlyat el Auth -> hashing w validation
//                   w table lel profile (feeh b2a elData bta3et eluser) age, fullname, city , ....
//                   w b3d kda a3ml Relation ben elUser w elProfile bta3o (1-To-1)

// 3shan tfhm el Relation bta3et el User & Profile ,, zakerha mn :  https://typeorm.io/one-to-one-relations (3zmaaaaa)
// 1- el3laka hatb2a en kol user leeh profile , fa 3ayez agy 3nd el user table w a7ot field gdeed esmo profileId , w da hykoon = foreign key
// 2- elTable ely 3amel @JoinColumn() hwa ely hayt5zn feeh elForeignKey (ely 7wa fe el7ala de elUser)

// Note about my project
// el Project hyb2a feeh (Singer or musician) -> ( mo8ny(amr diab) & musician(omar khairat) )
// w el 2 hyb2o nfs el properties, bs kol 1 fehom table (entitiy) , fa h3ml Parent Abstract class w a5od mno ..
// Parent Abstract Class (Artist) -> Childs(singer & musician)
// Note: 7ta el Singer or musician hyb2a 2 types : single - band

// Albums Modules ..
// albums 3adya , zy msln album traneem le mornm , feeh kza trneema ..
// hyb2a fe 3laka ben el Album w el Mornm ,, (M-to-1) mn na7ya elAlbum , w (1-to-M) mn na7ya el Mornm

// Music & Songs Modules
// elMusic w elSong moshtrkeen fe kol haga, fa kal3ada h3ml abstract wa3ml mno inherit
// hyb2a fe 3laka ben el Song w elAlbum tab3nn ,, (Music & MusicAlbum) , (Song & SongAlbum)

// Playlists & FavPlaylist Modules
// Playlist = zy Traneem5 kda , lel user
// elPlaylist as a class , its just name & id & user ,, but the content(songs) = just relation , msh b3mlha fe elClass property
// el Fav Playlist eh lazmtha ? -> 3shan lma a5osh msln profile kol 1 , ashoof a7la playlist 3ndo w zo2o , w ast5dmha b3d kda fe elAnalysis

// Track Module ..
// Read fo2 koll haga 3n elTrack ..
// elTrack Relations .. 4 relations (4 Foreign Keys)
// 1- PlaylistId (elTrack da tb3 anhy playlist)
// 2- SongId (elTrack da = anhy o8nya) // or MusicId (3)
// 4- favId (elTrack da mwgood fe elFavorite list)

// el 4 Relations = Many-To-One mn na7ya elTrack ,, w mn elNa7ya elTanya One-To-Many
// 3shan msln el playlist feha Many tracksss 
// w el song = many trackss .. y3ni msln elMornm magdy nazl song gdeda , fe b2a 10 users 5dooha 3mlolha save fe 10 playlists = 10 Tracks

// EntityManager vs Repositories
// el EntityManager barely = elRepository ely esht8lt beha abl kda , bs global 3l DB kolha
// EntityManager = tha whole DB (All Repositories"entities" in 1 entity)
// el Repository is Limited to a specific entity (elRepository = entity 1 bs)

// Working with EntityManager
// entityManager.findOne(users , {id:11}) // esm el Entity + 3ayez eh
// entityManager.findOne(singers , {id:11});

// Working with Repositories (Better) , (koll entity lw7dha a7sn tab3n)
// 2 ways for working with Repositories

// 1- ely 3mltha abl kda , m3 mohammed Essa -> b3ml inject lel Repository fe elService  
/*
    constructor( @InjectRepository(UserEntity) private userRepository ){
    }

    getUsers(){
        return this.userRepository.find()
    }
*/

// 2- Make Repositories on their own 
/*
    import { EntityRepository, Repository } from "typeorm";
    import { UserEntity } from "../entities/user.entity";

    @EntityRepository(UserEntity)
    export class UserRepository extends Repository<UserEntity>{
        // Methods -> getUsers , postUser , ...
        async findUserByEmail(email:string):Promise<UserEntity> { // ay haga btrg3 mn elDB = Promise , mmkn mtktbhash lw 3ayz (elReturn Type)
            return await this.findOneBy({email}); // this = this Class : UserRepository Class
        }
    }
*/
// Note: elTaree2a de lel Repository ->  Deprecated .. "adeema"
// the new way :
/*
    export class SongRepository extends Repository<Song>{
        constructor( private dataSource:DataSource ){
            super(Song, dataSource.createEntityManager());
        }
*/
// super() ??  super(Song, dataSource.createEntityManager()); ??
// fe el OOP lma t3ml inherit mn class kbeer, lazem tedy elData bta3to leeh : super()
// b3ml call lel parent class w adelo elData bta3to

// Note: ana h3ml elFunctions (elLogic) mo3akada shwya zy ma by3mlha (3shan at3lm hagat gdeda)
//       ana mmkn a3mlha 3ady sahla zy elExpress aw elNest m3 Mohammed Essa , bs 3shan at3llm

// QueryBuilder
// el ORM by5leeny msh bktb el SQL queries .. INSERT kzaa from kzaa where ...  w elhagat de
// el QueryBuilder bt allow me to write Queries

// Music Repositories with QueryBuilder
// Musician - singer - .... ,, why with QueryBuilder ??
// 3shan 3ayez complex queries (limit,filter,where,getBy, join , ...)

// this.createQueryBuilder -> y3ni el QueryBuilder de btegy mn el Repository


//--------------------------------------------------------------------------//
// RestApis & Controller
// Most 2 Commons APIs (EndPoints)  ->  RESTful & GraphQL

// Video #23 - #24  ->  AWS S3 for uploading images , fkk mno (msh lazem) , asln b floos ,, // use cloudinary

// Interceptors in Nestjs

// klma interceptor y3ni bel 3rby "e3tradya"
// interceptor = MiddleWare , bs elfr2 en el interceptor mn m3nah "e3tradya" , by3trd el Request abl ma yroo7 lel RouteHandler
// Interceptors have access to response/request before and after the route handler is called.
// y3nii byst2bl elRequest "y3trdo" abl ma yroo7 lel handler(Controller) , 3shan y3ml feeh haga

// Interceptors -> 3shan msln a5od elReq Body abl ma yroo7 lel Handler 3shan azabt el image form msln (lw elData gya formData) "files"


//---------------------------------------------------------------------------------//
// Note: el Nest sahlaa awiii w momt3a..
// a7la mn elExpress bkteer , bs elQaderi da ms3bha 3shan msh monzm..
// erg3 ektb el3ady, zy Mohammed Essa
// Note : elVideos elTweela el 40 min wkda , kolhaa tafhaa , mta5odsh 5 min
//        w asln koll 3 4 videos wra b3d , kolohom nfs elCode bzbt copy paste
//---------------------------------------------------------------------------------//

// Upload image with nest .. (addNewSinger)
// 1- el image lazem tt5zn fe el DB as a link , 3shan lma a get el singer data, el singer.image lazem tb2a url 3shan a3rdha fe <img src='' >
// el so2al hena b2a , ezay lma b3ml upload le img(file), btt7wl le link ? 
// -> 3shan ana bmsk el img ely et3mlha upload w a3deeha 3la interceptor y handlha hwa, w b3den brf3ha 3la cloud (aws3,clioudinary,fileSystem)
//    w b3den hwa ely bydeeny elLink da ..
// lma bst5dm aws3 , el Link byb2a mn server aws ..
// lma bst5dm cloudinary , el Link byb2a mn server cloudinary..
// lma bst5dm multer , el Link byb2a mn server gehazy , localhost (fileSystem)

// 1- use interceptor
// el use interceptor m3mool 3shan -> formData
// 3shan lw 3ayz a3ml upload le file, msh hb3t json(req.body) , dna hb3t form data
// el FormData 8er el json ,, json = object ,, elFormData = keys->values
// msh h3rf at3amel m3 el form-data mn 8er el Interceptor
/*
    @Post()
    createNewSinger(@Body() body:CreateMusician ){ // e3ml DTO w 5od elData kolha as a 1 body , object
        console.log(body);
    }
    // lw 3mlt kda w ba3at form data , msh hy2bl asln
*/
/*
    @Post()
    @UseInterceptors(FileInterceptor('image')) // req.body.image
    createNewSinger(@Body() body:CreateMusician , @UploadedFile() image:any){ // e3ml DTO w 5od elData kolha as a 1 body , object
        console.log(body);
        console.log(image); // = htgeelk as a buffer , lazem ygm3ha
    }

    {
        fieldname: 'image',
        originalname: '4x6 img.png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00  00 01 ae 00 02 44 08 06 00 00 00 00 00 2e 23 00 00 2e 23 01 ... 173739 more bytes>,
        size: 173789
    }

*/

// 2- tmp : lazemm t3ml lel name filter w tlz2oo, 3shan lw msmy sora "andrew 2" msln, elURL msh by2bl msafat

// Why Multer ??  video #29
// Note: l7d henaa , enta gahez 5las t AddSinger bel Form
/*
    // 1- Controller
    @Post()
    @UseInterceptors(FileInterceptor('image')) // req.body.image
    createNewSinger(@Body() body:CreateMusician , @UploadedFile() image:any){ // e3ml DTO w 5od elData kolha as a 1 body , object
        console.log(body);
        console.log(image);
        this.singerService.addNewSinger(body.name,body.info,body.gender,body.nationality,body.type, image);
    }

    // 2- Service
    async addNewSinger(name:string, info:string, gender:Gender, nationality:string, type:ArtistType, image:any) :Promise<Singer> {
        const singer = new Singer(); // h3ml object mn class Singer
        singer.name = name;
        singer.info = info;
        singer.gender = gender;
        singer.nationality = nationality;
        singer.type = type;
        singer.image = image; // hy3ml hena aws3 Implementation

        const savedSinger = await singer.save();
        return savedSinger;
    }

    // Result -> elData 3mltha bel Postman , w etdafet f3lln fe elDatabase , buttttt ,,
    //           bs el image mt5znaa 8llt , object kbeer kdaa (el image mt5zna 0s 1s) !!
    /*
        {"fieldname":"image","originalname":"4x6 img.png","encoding":"7bit","mimetype":"image/png","buffer":{"type":"Buffer","data":[137,80,78,
            71,13,49,26,10,0,0,0,13,73,72,68,82,0,0,1,174,0,0,2,68,8,6,0,0,,34,6,
            125,215,90,123,239,239,118,206,169,115,78,221,187,170,171,221,55,183,141,83
            ,142,241,45,105,199,110,25,8,137,132,48,3,133,144,642,123,011,299,66,33,22,111,35,67,23,41,26,38
        }
    */

    // el7all enk t Handle el image be Multer ,, elMulter hta5od koll el3abtt da w trg3lk imageURL


// Validation and DTOs
// Note: el DTO msh ht5le elInputs fel Body Restricted aw Required
//       lw 3ayz elDTO tsht8l ka validation leek fe el Nest Project -> 8ayr el tsconfig , 5le haga fehom true
//       bs tab3n a7sn haga lel validate enk t validate el DTOs by class-validator
//       w 5ale kol el props de 1 prop : 1 @Body()


// Noteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee :
// el TypeORM Repository is Deprecated (el tare2a ely by3ml beha Repositories deprecated 'adema')
// lma geet a3ml find w operation 3leha edany Error: EntityMetadataNotFoundError: No metadata for "SingerRepository" was found
// fa lma 3mlt search, tl3 3shan deprecated f3lln ,, fa lazem a8yr kol elRepositories bel tre2a elgdeda
// The Solution :
// Link elSolution : https://stackoverflow.com/questions/72680359/nestjs-entitymetadatanotfounderror-no-metadata-for-repository-was-found
// w 3mltha fe elSingerRepository w esht8lt .. e3ml kolo zy el SingerRepository b2a
// w ht7tag t8ayr kman fe el Module, ht7ot el Repo fe elProviders

// Wow , fe elMulter est5mdt el unlink 3shan ams7 elImages b3d ma a delete elUser wkdaa

// 3mlt elSinger kamel , services w koloo
// 5od b2a copy w e3ml elMusician ,, hwa hwa

// source hya el song itself
// w el Add New Song htb2a fe el AlbumService , msh el SongService ..

// SongAlbum Repository ,, msh h3ml Repository m5sos fe file zy el music w songs , 3shan ana msh 3ayz function 5asa bya ..
// e3mlha 3ady be ay tare2a ..

// once enk tktb : song.singerAlbum = singerAlbum;  -> elSong htb2a mt5zna fe el Album .. (1-To-M)
// = bzbt lma tktb : singerAlbum.songs.push(song); // mtktbhash b2a , kda htb2a circular
// koll el 1-To-M Relations btt3ml bnfs elTare2a kda 
// lakn lw 1-to-1 -> bt3mlha zy eltare2a el 2 kda

// song.singerAlbum = singerAlbum;  //-> fe Relation hena , fa de m3naha enk btrbot el album da bel song da
//                                       m3naha roo7 lel album da w erboto bel song de

// el Workflow dlw2ty sh8ala kda ..
// ba Add Singer , then Add SingerAlbum , then add Song in this album(by albumId)
// Note: koll elAlbums bta3et koll elSingers btb2a fe 1 table , w feha el SingerId 3shan a7ddhom ..

// Note: fe fr2 fe el mosamyat (singerAlbum -> songAlbum)


// >>>>>>>>>>>>>>>>>>>>>>>>>> Conclusion of this part <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
// Wow, Now :
// 1- el User can add song or music in albums , w btt7at fe files 
// 2- w eluser can add image to singer or musician
// 3- enta msh m7tag kma t find elsinger msln, t3ml population 3shan tgeeb elAlbums bta3to wkda , bsbb elRelation ely enta 3amelha
//    hya btrg3 lw7dha ..
// 4- fadel el Validation 3l inputs, hwa msh 3amlha 3shan hy3mlha fe elAngular ..
//    e3mlha enta 3l DTOs (Class-Validator)
// Note : elVideos elTweela el 40 min wkda , kolhaa tafhaa , mta5odsh 5 min
// >>>>>>>>>>>>>>>>>>>>>>>>>>> The End of that part <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 

// Note: Relations in DB (ForeignKeys)
// Remember : fe el DB ana bsawy entity b entity w elDB hya ely bt generate el FK
// y3ni msln : playlist.user = user; // will create foreignKey : userId , bos el playlistEntity elRealtion (bta5od el user w trg3 userId FK)
// y3nii ana lw 3ayz el FK yb2a Id , lazem asawy elField msh bel id , la da ana asweeh bel userEntity w hwa yrg3ly el Id
// -> track.song = song; -> will create songId ..



//------------------------------------                         ---------------------------------------//
//------------------------------------  Videos from #30 - #36  ---------------------------------------//
//------------------------------------                         ---------------------------------------//

// jwt vs passport
// el passport is general Strategy , bst5dm gwaha mechanism jwt
// w mechanism el jwt fe passport gaheeez , msh ht7tag t3ml el (jwt Logic) 3la elUser bnfsk

// Why Passportjs ?
// el passport is an Authentication Middleware
// by5le elUser y3ml login be tare2a m3mola gahza
// there are many strategies in passport (login with google, with facebook , with username & password , ...)
// leh nas kteer bt3ml elAuth Strategy be google w facebook ??
// 3shan ashal w more useable lel user (UX) , elUser msh by7b kol shwya ymlaa Form w kda ..
// w 3shan more secure

// How it works ?
// lma elUser by3ml login , elPassport bt7ot fe elRequest haga esmha user -> user.req  , w de feha m3lomat elUser ely 3ml login w byb3t request
// w el req.user de , elUser (Client) , mlhoosh ay access 3leha , so it's Secure ..
// Middleware = Any Function can Access Request

// 5olasa el Passport.js 
// link el Post : https://www.facebook.com/groups/nodejs.egypt/permalink/5337870426334919/
// ana wa5ed elPost Screenshot

// elshar7 ely t7t msh htfhm mno awy , koll haga htwd7 mn video  #33  #37  #38 

// user login -> check token -> Role(admin - user) -> what to Access

// Role Based Auth 
// mn esmha , koll Action is based on your Role

// user login (email & password  ||  username & password) , then take the data and generate a Token
// lw elToken exist (et3ml) -> 5osh 3l controllers

// each controller has : Guards
// AdminGuard: check el user login wla la , w admin wla la
// userGuard: check el user login wla la , w user wla la

// el Token hwa ely hyrg3 elUser w yrg3 el Roles bta3t elUser

// you should import passport in each module you wanna protect

// JwtStrategy : sho8lto eno yst2bl el Token mn elHeader , w yt3amel m3ah

// i will make auth with passport & i will apply passport with jwt strategy
// 1- extract the token from req header & detect the secret key 
// 2- make function validate the payload : eltoken b3mlo decode, a5od mno el payload (user , email msln)
// 3- ha5od elEmail mn el token decoded payload , w a check elEmail mwgood fe elUserRepository wla la
// 4- lw el user mwgood , return elUser
// 5- ba Apply elStrategy de b2a fe el AuthModule
// 6- tb lw 3ayz b2a tst5dmha f3ly fe elMusic Controller msln ? ,, roo7 fe elController w e3ml elGuards w apply elStrategy fe elMusic Module

// JwtStrategy :
// sho8lto eno yst2bl el Token mn elHeader , w yt3amel m3ah
// 5odo Copy Paste mn Nest Doc
// Lazem be nfs asamy elFunctions w kdaa
// elPassport mstny mnk function validate de 
// 3shan ysht8l lazem t7oto fe elProviders fe elModule


// SignUp Workflow
// 1- once elUser y fill elForm , e3mlo 3 hagat -> User + Profile + favList  (kolohm benhom 1-To-1 Relation)  // user -> profile -> favList
// Note: Any 1-To-1 Relationship , el 2 entities ely benhom elRelation lazem yt3mlo fe nfs el La7za
// h3ml el foreignKey(profileId) gwa el User (profile <-> user) , w lma a3ml profile e3mlo favList m3ah (1-To-1)

// 2- lma el user y3ml signup -> ha5od mno 2 DTOs (1 3shan a3ml beeh elUserAuth , w 1 3shan userProfile)
// y3ni el body object ha5do a3mlo 2 objects(2 DTOs) 
// w a3ml behom el userAuth w el userProfile at the same time (3shan elRelation 1-To-1)

// 3- ha5od elData w a3ml 3leha validations (check , if email-username exist (try onother one))
// 4- lma at2kd eno Valid w tmam : h3ml elVerified Email as an Entity -> (email - emailToken - timestamp)
//    el Entity de htb2a fe elDB as a row kda (email token timestamp) awl ma eluser y3ml verify , h3ml delete lel row da
// y3niiii , el Table verifiedEmail da hyb2a fe elUsers ely 3mlo Accounts bs lesa m3mlosh verify lel accs
// hb3tlhom emails verifying , w ely verified mnhom sheelo mn elTable
// el emailToken : haga 3shan at2kd en eluser ely 3ml create lel Account hwa hwa ely das 3la verify
//                 = url, lma ydoos 3leh , tmam verified
// eltimestamp : ba3att el email Verivication emta

// Noteeee :
// hwa 3amel lel User 2 DTOs : (userProfileData - userAuthData)
// w byb3thom bel PostMan as an object of 2 objects (Nested)
// w bya5dhom be 2 @Body()
// buttt msh 3amel validation bel class-validator , laken ana 3amel
// fa el Validation msh byt3ml 3l Nested Object , fa 3mlto kolo fe 1 object

// Note : environment variables (.env) : https://www.tomray.dev/nestjs-config
// https://dev.to/emmanuelthecoder/how-to-solve-secretorprivatekey-must-have-a-value-in-nodejs-4mpg
// Lazemm 3shan tst5dm el .env fe elfiles , tegy fe elFile ely 3ayzo feeh w tktb :
/*
    import * as dotenv from 'dotenv';
    dotenv.config();
*/

// exports : 3shan ast5dmhom fe el Modules eltanya

// @ToDo : Nodemailer
// Note : (Video #32) from min 15 = Nodemailer

// Note: ayyy entity msh ht3mlha extends BaseEntity -> msh hynf3 tst5dm feha el Methods ely zy save();


// video #33 Register

// ylaaaaa, awlll 2a3da mn 2 le 6 -> h5lls video (#30 -> #33) asln m5lshom kolohm fehm, na2es elCode bssss

// @ToDo : Nodemailer (VerifyEmail)
// 1- (Video #32) from min 15 = Nodemailer
// 2- (Video #35)
// 3- (Video #39) Forgot Password

// Noteeee :
// hwa 3amel lel User 2 DTOs : (userProfileData - userAuthData)
// w byb3thom bel PostMan as an object of 2 objects (Nested)
// w bya5dhom be 2 @Body()
// buttt msh 3amel validation bel class-validator , laken ana 3amel
// fa el Validation msh byt3ml 3l Nested Object , fa 3mlto kolo fe 1 object

// Note : elPassword bta3y = wasdasddd


//------------------------------------                         ---------------------------------------//
//------------------------------------  Videos from #37 - #39  ---------------------------------------//
//------------------------------------                         ---------------------------------------//

// Login & Guards(Roles)
// Role Based Authorization

// Note: el Auth hena = el .Net bzbttttt  (wow , el Nest shabah el .Net w Angular bzbtttt)

// 1- Login
// check el Email w pass , lw tmam ,, 5od elEmail w e3ml payload w Generate Token beeh
// zy ma kont b3ml fe elExpress 3ady
// awl haga hat check elEmail w elPassword , lw tmam generate elToken , lw msh tmam e3ml throw le exception
// w mt3mlsh token..

// 2- Guards(Roles)
// koll EndPoint ha7ot guard (y2ool msmo7lo yd5ol wla la)
// awl haga lw msh 3amel login w mfeesh token ,, emn3oo
// elGuard bya5od elToken w yfoko w yshoof elRole bta3to , w msln lw fe elAdminGuard tel3 msh admin , return false
// w kol EndPoint leha guard , msln el View Songs : userGuard  ,  elDashboard : AdminGuard
// Note elGuards fe elNest = stambaa m7fooza , 3amleenhalk gahza

// canActivate : wenta da5el 3l Route da es2ly elGuard elAwl (msmo7lo wla la) , bta5od elAuthService
// bt return True || False  ,, lw true 5osh , false la
// return ay haga boolean aw leha 3laka be boolean
// gwaha b2a bktb ezay a3rf eno user wla la (fok elToken wkda)

// Moshklaa el @UseGuards() , enk lma tla2y errors tb3 el auth w 3ayz ttb3 el req 3shan tshoof elErrors fen , msh ht3rf
// 3shan elGuards bta5od elReq bshakl 5afy w bt accesso abl el Handler , fa lw fe error, msh hywsl asln lel handler
// fa msh ht3rf t3ml lel req print ..
// el 7al , enk tst5dm MiddleWare 3ady

// Note: el @UseGuards msh ht5le elRequest ywsl lel handler asln lw fe error aw unAuth

// Note: Why always const ?!! ,, leh msh b3ml let w var ??
//       => Better Performance, el js Engine msh bystna mnk reAssign , by7ot elFinal value directly w y2fl elMwdoo3

// Note: el @Decorators in Nestjs = MetaData

//------------------------------------                         ---------------------------------------//
//------------------------------------  Videos from #40 - #43  ---------------------------------------//
//------------------------------------                         ---------------------------------------//

// l7d hena elUser 3ml login w tmam , 3ayz b2a akmll , lma y3ml login arg3 el Profile bta3o w elFavList w kdaa ..

// Profile Controller (getProfile ??)
/*
    @Get('user-profile')
    getUserProfile(@getAuthenticatedUser() user:UserEntity){ // elDecorator ely 3mlto 3shan y fetch elUser mn elRequest, = el @Param()
        console.log(user);
        return this.profileService.getProfileData(user);
    }
*/
// Explain ..
// elUser hy3ml login fa elData bta3to htb2a fe el req.user
// ana 3ayz b2a lma elUser y3ml login ywdeh 3l Profile bta3o msln
// mn elA5er 3ayz getProfileById() , bs el id ykoon mn elToken (req.user)
// fa 3mlt decorator ygeeb elUser mn elRequest w elDecorator = Param
// @getAuthenticatedUser() ana ely 3amlha
// el user ely hyrg3 mn elToken :
/*
    UserEntity {
        id: 1,
        username: 'Andrew_Ayman',
        email: 'andrewayman7@gmail.com',
        password: '$2a$10$CMuI1dyXl4etxsaZtvhQfOiyDRK8kYOKmTBTtRBolf3S00SSIcPqe',
        salt: '$2a$10$CMuI1dyXl4etxsaZtvhQfO',
        roles: [ 'USER' ],
        auth: { facebookId: null, gmailId: null, validEmail: false },
        profileId: 1 // da ely ana 3ayzo
    }
*/
// Note: ay Controller htst5dm feeh el AuthGuard() -> lazem t3ml import fel Module le passport PassportModule.register({ defaultStrategy: 'jwt',})

// Note: fe el Nest , nzam el Modularity , kol haga 5asa bel Module, 3shan tst5dm service mn module , fe module tany ,, 
//       lazem t3mlo export b nfsk , w troo7 fe elModule elTany t3mlo import
//       exports : [ ]
//       w b3dha t3mlhom inject


//------------------------------------                         ---------------------------------------//
//------------------------------------  Videos from #43 - #48  ---------------------------------------//
//------------------------------------                         ---------------------------------------//

// Remember Again : el Project sahll w gameel , bs hwa ely tare2to r5maa , bs ana bfhm lw7dy

// Important Note :
// ana 3ayz lma elUser y3ml login, elData bta3to tkoon m3aya fe koll elSaf7at (kol elRequests)
// 3ayzo yt7rk bel Data bta3to fe el mwk3 ..
// Param Decorator : @getAuthenticatedUser() ..
// h3mlo w adeeh le koll EndPoint fe elController ..
// elUser hy3ml login fa elData bta3to htb2a fe el req.user
// ana 3ayz b2a lma elUser y3ml login ywdeh 3l Profile bta3o msln
// mn elA5er 3ayz msln getProfileById() , bs el id ykoon mn elToken (req.user)
// fa 3mlt decorator ygeeb elUser mn elRequest w elDecorator = Param
// @getAuthenticatedUser() ana ely 3amlha

// Interaction between Relations (connect songs bel playlists w favList)
// Note: koll elT3amlo fe elPlaylists w elFavList htb2a bel Track , msh bel songs w musics ..
//       Track = Relation (listId + songId)

// Remember : (Rlations , M-To-M , Track)
// 1- any Relation M-To-M elResult bta3tha lazem tb2a new Table (tsheel el hagten aw aktr ely 3ayz arbthom mn el 2 Tables)
// 2- msh logic 5ales eny at3amel bel songId fe elPlaylist, y3ni ana lw 3ayz ams7 song mn playlist , hms7 el id bta3ha ,
//    hms7 el id bta3 elSong !! , = htms7 el Song
//    lma ams7 track , ytms7 5ales mn elDB -> Track(id - songId - playlistId) , ems7 elTrack, ems7 elRelation
// mn 1 - 2 : mantky eny lma a3ml relation M-To-M yb2a ana 3ayz a3ml 3laka ben field hena w field hena , fa elKlam da mynf3sh b 1 foreignKey
//            da ana 3ayz a5zn FK mn elTable elawlany w FK mn elTable eltany (el 2 fields) , 3shan dol fe benhom relation, 3ayzhom swa
//            fa el DB bt2oly lazem table gdeed -> ( id(PK) - songId(FK) - playlistId(FK) ) , w shya hagat tanya
// Remember : fe el DB ana bsawy entity b entity w elDB hya ely bt generate el FK
// y3ni msln : playlist.user = user; // will create foreignKey : userId , bos el playlistEntity elRealtion (bta5od el user w trg3 userId FK)
// y3nii ana lw 3ayz el FK yb2a Id , lazem asawy elField msh bel id , la da ana asweeh bel userEntity w hwa yrg3ly el Id
// -> track.song = song; -> will create songId ,, 

// so, add song to playlist = (songId + playlistId) = new row in DB Table = Track

// elTrack mlhash controller tab3n , ana msh 3ayz ay linkat 3l track (EndPoints)
// ana b Add Song msh track , w lma b5osh 3la track, hwa actually byroo7 3l Id bta3 elSong ely gwa elTrack (track.songId)

// WoW , da hwa hwa elSoundCloud 100%

// dlw2ty el FavoriteList w el Playlist gwahom tracks , elTracks de gaya mn Table tany (Table Tracks) , tb ezay btgbha ?
/*
    @OneToMany(type => Track , t => t.favoriteList , {eager:true})
    tracks:Track[]; // htroo7 lel Tracks table w tgeeb elTracks ely elFavId bta3tha = el favloriteList de
*/

// why loop ?  , akeed fe tare2a eny afddy elArray fe elDB 8er eny amshy 1 1
// No .. no way , 3shan el favlist.tracks[] , el values bta3tha = rows of Tracks Table , w elTracks Table feeh million track ,
// fa lazem aroo7 w a3ml deleteTrack By Id .. le kol 1 fehom
// 3shan elArray hena field fe object , fa ana 3ayz a5le el row hwa hwa, bs ams7 el field elArray da bs
// tb mat3mlo delete?? ,, bardo laaaaa , ana msh 3ayz ams7 el tracks[], ana 3ayz a5leha bs tkoon empty
// fa lazem ams7  wa7da wa7da mn el Track Table
// w fe elA5er a3ml fav.tracks = [];  // faddy el Array mn el IDs

// Noteee: hwa bardo bybtdy mn elA5er lel awl , elMafrood bel tarteeb :
// 1- bdoos 3l song (add to favList) 3shan tb2a track b2a ..
// 1- SongService (push song to favList) w hyb2a feh EndPoint POST Method , so fe elService etwasel m3 el favList Service , 
// 2- FavList service (astlm elSong w a3mlha set enha tkoon track fe elFav), w b3den etwasel m3 elTrack Service
// 3- trackService (tstlm el song b2a w elFavList , w e3ml b2a new track() , w a3ml set lel Properties w save fe el DB )
// Note: hwa b2a ebtda mn 3 -> 2 -> 1
// Note: fe 3mlya elClear favList msh h7tag b2a el songService wla el songController , 
//       3shan 3mlya elClear favList ana msh h7tag a5od song wla haga , htb2a directly mn el favlistController

// Note in Nest : lma tegy tst3ml msln object entity w 3ayz el helpers tgeelk (msln user.  , w 3ayz elProperties tzhrlk 3ltol) ->
//                => e3ml elReturn Type bta3 koll haga

// Note : dlw2tyyyy 3rft leeh by3ml elEndpoints fe amaken mo5tlfaaa w msh monzmaa
//        y3ni msln fe el addSongToFav -> 3mlha fe elSong Controller -> 3shan ya5od elSong mn elController da

// Note : 100% By Me -> mknsh 3amel ayy validations hena, kont mmkn a3ml push fe ay favlist 100 mraa ..

// Note : (Wow) in Relational DB (Postgre) -> enta msh m7tag 5ales msln t5osh table elsongs tgeeb koll elsongs el 5asa bel user de ..
//        enta once enk t3ml elRelations , btwfr 3lek koll da ..
//        once enk t3ml elRelation, by default hygblk m3 eluser el songs w elhaga el5asa beeh kolha


// Note: lma ykoon fe Relation 1-To-M -> awl haga ems7 elMany(Tracks) then ems7 el 1 (playlist)
/*
async deletePlaylist(id:number) :Promise<DeleteResult>{
    // 1- Delete playlist Content (tracks) , lazem ams7 elTracks bta3tha mn table elTracks , FKs
    // 2- Delete The playlist itself
    // Note: lma ykoon fe Relation 1-To-M -> awl haga ems7 elMany(Tracks) then ems7 el 1 (playlist)
    await this.clearPlaylistContent(id);
    const deleteRes = await this.playlistRepository.delete(id);
    if(deleteRes.affected ===0) throw new NotFoundException('playlist not found');
    return deleteRes;
}
*/

//------------------------------------              ---------------------------------------//
//------------------------------------  Video #49  ---------------------------------------//
//------------------------------------              ---------------------------------------//

// CMS : Content Managament System (Admins)

// 1- Lazem fe el login ykoon fee 2 Gates , 1 for user , w 1 for Admin
// 2- make api t5le eluser admin

//------------ Delete User ------------//
// elUser da leeh data (foreignKeys w relations) fe koll el Tables , fa lazem tms7 koll haga t5oso mn koll elTables
// msln el playlists : eluser lw leeh 10 playlists, fa ana 3ndy 10 IDs 3ayz ams7hom
// fa b3ml loop 10 mrat, kol mra 5od el id w ems7o mn el playlist Repository ..
// Note: enta mmkn t3ml fe el playlistService method : deleteAllUserPlaylistsById(userId)
//       w el method de t3ml loop 3la kol el playlists 3ly 3ndha , w lw nfs el id , delete it ..
//       bs efrd lw 3ndy million playlist !!! , laaa tab3n , tms7 wa7da wa7da by id a7sn
// tb we elTracks bta3et elUser ? -> Don't Worry , ana me handlha fo2 , once enk tms7 elplaylist , elTracks bta3tha bttms7

// lazemmmm bel tarteeb kda tms7 ->  el user then profile then favlist
// 3shan el userEntity feha foreignKey bta3 el profile , w elprofile feeh bta3 el favlist
// msh manteky eny ams7 msln el profile elAwl , w elProfile ely etms7 da, ykoon lessa el Id bta3o mwgood fe elUser !!
// w nfs elKlam , msh manteky eny ams7 favList elAwl , w ala2y fel profile el favListId !!

// Note : el User =  1- user(userData + profileId) , 2- profile(profileData + favoriteId)
// el y3ni 3shan awsl lel favId -> user.profile.favId => user.getProfile().favId

/*
async deleteUserAccount(user:UserEntity){

    1- lazem tgeeb el profileId elAwl w el favId , leeh ?? , mnadehom 3ltol t7t ?
       => lazemm 3shan lma ams7 elUser , msh hyb2a fe asln user.profileId
    2- tb leh 3mlt getProfile ? -> 3shan elUser msh byreturn el favId , lazem agbha mn el profile

    el User Returns :
    UserEntity {
        id: 1,
        username: 'Andrew_Ayman',
        email: 'andrewayman7@gmail.com',
        password: '$2a$10$CMuI1dyXl4etxsaZtvhQfOiyDRK8kYOKmTBTtRBolf3S00SSIcPqe',
        salt: '$2a$10$CMuI1dyXl4etxsaZtvhQfO',
        roles: [ 'USER', 'ADMIN' ],
        auth: { facebookId: null, gmailId: null, validEmail: false },
        profileId: 1
    }

}
*/

//------------------------------------                       ---------------------------------------//
//------------------------------------  The End Of That Part ---------------------------------------//
//------------------------------------                       ---------------------------------------//

// Kda 5lst el SoundCloud 100%
// kda fadel el SocketIo w Chat w Notifications 

//------------------------------------                   ---------------------------------------//
//------------------------------------  Video #50 - #53  ---------------------------------------//
//------------------------------------                   ---------------------------------------//
// Notes in Nestjs & Backend

// 1- GraphQl is much faster than RestApi (msln bygeeb elData Exactly , msh kolha w b3den yfilter)
// 2- MiddleWares in Nest
//    - LoggerMiddleware -> logging errors w actions
//    - useStaticAssets is a global Middleware
// 3- HTTP Exceptions -> gahza kolha fe elNest (Built in) (Note: lw elUser d5l endpoint admin: forbidden , lakn lw asln msh login: NotAuthorized)
// 4- Pipes -> mn esmha, byd5ol feha elData w t5rgo be shakl tany , i used validationPipe with class-validator
//     - fe msln ParseIntNumber, est5dmo fe elParam 3shan ygblk el id number -> updateMusic(@Param('id' , ParseIntPipe) id:number)
//     - w kman bt handle el exceptions, y3ni lw ba3at fe el param 'abc' msln w mst5dm parseInt -> 400 statusCode
//     - Custom Pipes : t3ml pipe enta w e3ml elLogic ely 3ayzo gwah
// 5- Guards : (user-admin) ay guard t3mlo lazem y implements el CanActivate(interface)
//              w gwah el Context (by access el request w ygeeb mno el el req.user 3shan ashof 3amel login wla la w ageeb elData)
// 6- Circular Dependency : lw fe 2 modules 3ayz a3mlhom export w import le b3d (lw 3ayz ast5dm service mn module fe module tany w el3ks)
//    btt3ml b -> forwardRef  &&  Testing overview => video #51 
// 7- App Security (Cors - Helmet - csurf - express-rate-limit - logging) => video #52 , tafheen sahleen awii , fkk mnhom

// Note: Nest with Fastify is much faster than Nest with Express

// Note: Nest with Angular homa homa bzbtttttt, zaker angular msh hta5od mnk yomen ..

// #Video #53 : Microservices - Swagger - Prisma

// Microservices with Nestjs => https://www.youtube.com/playlist?list=PLBHzlq7ILbsY7MncpG6UWf-f4XxYAAKu-    (3zmaaaaaaaa)
// Lazemm lazemmm tshofoo , so8yr awiiii

// @ToDo : Nodemailer (VerifyEmail)
// 1- (Video #32) from min 15 = Nodemailer
// 2- (Video #35)
// 3- (Video #39) Forgot Password
// 4- shoof b2a elUser lw 3ayz y3ml deleteAccount msln , lazem ykoon elAccount da = elUser ely da5el (ely 3amel login)
//    w msln at2kd fe elAddSong to album , en sa7eb elAlbum hwa nfso ely 3amel login wkda .. 3shan msh ay user aw admin yzwd haga