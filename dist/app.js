"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http = __importStar(require("http"));
const path = __importStar(require("path"));
const config_1 = __importDefault(require("./config"));
const pool_1 = __importDefault(require("./pool"));
const servers_json_1 = __importDefault(require("./servers.json"));
const app = express_1.default();
const server = new http.Server(app);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.render('index', {
        host: config_1.default.socketHost,
        maxPlayers: config_1.default.maxPlayers,
    });
});
server.listen(config_1.default.port, () => {
    console.log(`Listening on port ${config_1.default.port}`);
    const pool = new pool_1.default(server, servers_json_1.default);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx3REFBMEM7QUFDMUMsZ0RBQXdCO0FBQ3hCLHNEQUF5RTtBQUN6RSxvREFBNEI7QUFDNUIsMkNBQTZCO0FBQzdCLDJDQUE2QjtBQUU3QixzREFBOEI7QUFDOUIsa0RBQTBCO0FBQzFCLGtFQUFxQztBQUVyQyxNQUFNLEdBQUcsR0FBWSxpQkFBTyxFQUFFLENBQUM7QUFDL0IsTUFBTSxNQUFNLEdBQWdCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUVqRCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRTlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQU0sRUFBRSxDQUFDLENBQUM7QUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDM0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDbEIsSUFBSSxFQUFFLGdCQUFNLENBQUMsVUFBVTtRQUN2QixVQUFVLEVBQUUsZ0JBQU0sQ0FBQyxVQUFVO0tBQzlCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsZ0JBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLE1BQU0sRUFBRSxzQkFBTyxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDLENBQUMifQ==