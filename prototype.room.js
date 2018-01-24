/**
 * Created by Andy on 1/28/2017.
 */

module.exports = function() {
    Room.prototype.chooseSpawn =
        function(roomName) {
            var spawnNames = Game.rooms[roomName].find(FIND_MY_SPAWNS);
            console.log(spawnNames);
            for (i in spawnNames.length) {
                if (Game.spawns[spawnNames[i].name].spawning == null) {
                    console.log('TEST: ' + spawnNames[i].name);
                    return spawnNames[i];
                    continue;
                }
                else {
                    return false;
                }
            }
        }
};
