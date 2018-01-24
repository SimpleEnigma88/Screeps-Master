/**
 * Created by Andy on 12/27/2016.
 */

function()

if (dropMiners.length > 0) {
    var createHarvester =
        function (energy) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 100);
            // make sure the creep is not too big (more than 50 parts)
            numberOfParts = Math.min(numberOfParts, Math.floor(50 / 2));
            var body = [];
            //for (let i = 0; i < numberOfParts; i++) {
            //body.push(WORK);
            //}
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return body;
        };
}
else {
    var createHarvester =
        function (energy) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 100);
            // make sure the creep is not too big (more than 50 parts)
            numberOfParts = Math.min(numberOfParts, Math.floor(50 / 2));
            var body = [];
            //for (let i = 0; i < numberOfParts; i++) {
            //body.push(WORK);
            //}
            for (let i = 0; i < numberOfParts - 1; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts - 1; i++) {
                body.push(MOVE);
            }
            body.push(WORK);
            body.push(WORK);

            // create creep with the created body and the given role
            return body;
        };
}