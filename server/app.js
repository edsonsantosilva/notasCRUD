import Hapi from "@hapi/hapi";
import fs from "fs";

const fileName = "db.json";

const app = new Hapi.Server({
	port: 3000,
});

app.route([
	{
		path: "/notas",
		method: "GET",
		handler: (req, headers) => {
			const data = fs.readFileSync(fileName, "utf-8");
			return data;
		},
		config: {
			cors: {
				origin: ["*"],
			},
		},
	},
	{
		path: "/notas",
		method: "POST",
		handler: (req, headers) => {
			const id = Date.now().toString();
			const newNote = JSON.parse(req.payload);
			newNote.id = id;
			const data = JSON.parse(fs.readFileSync(fileName, "utf-8"));
			data.push(newNote);
			fs.writeFileSync(fileName, JSON.stringify(data));
			return headers.response(newNote).code(201);
		},
		config: {
			cors: {
				origin: ["*"],
			},
		},
	},
	{
		path: "/notas",
		method: "PUT",
		handler: (req, headers) => {
			const newNote = JSON.parse(req.payload);
			const data = JSON.parse(fs.readFileSync(fileName, "utf-8"));
			data.push(newNote);
			fs.writeFileSync(fileName, JSON.stringify(data));
			return headers.response(newNote).code(201);
		},
		config: {
			cors: {
				origin: ["*"],
			},
		},
	},
	{
		path: "/notas",
		method: "DELETE",
		handler: (req, headers) => {
			const body = JSON.parse(req.payload);
			const data = JSON.parse(fs.readFileSync(fileName, "utf-8"));
			const indexes = [];

			for (const item of body.ids) {
				const finded = data.find((val) => val.id === item);
				indexes.push(data.indexOf(finded));
			}

			for (const index of indexes) {
				data.splice(index, 1);
			}

			fs.writeFileSync(fileName, JSON.stringify(data));
			return headers.response().code(200);
		},
		config: {
			cors: {
				origin: ["*"],
			},
		},
	},
]);

app.start();
console.log("Server running at", app.info.port);
