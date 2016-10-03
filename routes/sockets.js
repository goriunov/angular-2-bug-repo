
module.exports = function(io){

    ALL_PLAYERS = [];
    AVILABLE_PLAYERS = [];

    // Creating Player
    function createPlayer(id , client, name){
        ALL_PLAYERS[id] = client;
        AVILABLE_PLAYERS.push({name: name, id: id});
    }
    // Emit to all users
    function emitter(){
        for(var i in ALL_PLAYERS){
            ALL_PLAYERS[i].emit('players in' , AVILABLE_PLAYERS);
        }
    }


    //My index for Objects in Array
    function myIndexOf(obj) {
        for (var i = 0; i < AVILABLE_PLAYERS.length; i++) {
            if (AVILABLE_PLAYERS[i].name == obj.name && AVILABLE_PLAYERS[i].id == obj.id) {
                return i;
            }
        }
        return -1;
    }


    // Socket io on connect from Client
    io.on('connection', function (client) {

        //Creating client and comunication (invitation)
        client.on('create user' , function(name){
            client.id = Math.random()*(ALL_PLAYERS.length + 1)*Math.random()*(0.1233+ALL_PLAYERS.length);
            client.name = name;
            client.decision = '';
            createPlayer(client.id, client , client.name);
            //emmit to all client
            emitter();
        });



        client.on('disconnect' , function(){
            ALL_PLAYERS.splice(ALL_PLAYERS.indexOf(client.id) ,1);
            if(myIndexOf({name: client.name , id: client.id}) != -1) {
                AVILABLE_PLAYERS.splice(myIndexOf({name: client.name , id: client.id}), 1);
            }
            emitter();
        });


    });





};