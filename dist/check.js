"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const bluebird_1 = __importDefault(require("bluebird"));
function getPlayers(server) {
    return __awaiter(this, void 0, void 0, function* () {
        let players = null;
        try {
            const response = yield axios_1.default({
                url: `${server.host}/players.json`,
                timeout: 1000,
            });
            players = response.data.length;
        }
        catch (error) {
            console.log(error.message);
        }
        return Object.assign({}, server, { players });
    });
}
function getAllPlayers(servers) {
    return bluebird_1.default.map(servers, getPlayers);
}
exports.default = getAllPlayers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQix3REFBZ0M7QUFHaEMsU0FBZSxVQUFVLENBQUMsTUFBc0I7O1FBQzlDLElBQUksT0FBTyxHQUFXLElBQUksQ0FBQztRQUUzQixJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUM7Z0JBQzNCLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLGVBQWU7Z0JBQ2xDLE9BQU8sRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDO1lBRUgsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ2hDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QjtRQUVELE9BQU8sa0JBQ0YsTUFBTSxJQUNULE9BQU8sR0FDVSxDQUFDO0lBQ3RCLENBQUM7Q0FBQTtBQUVELFNBQXdCLGFBQWEsQ0FBQyxPQUF5QjtJQUM3RCxPQUFPLGtCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRkQsZ0NBRUMifQ==