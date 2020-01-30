const mysql = require('mysql');
const config = require('config');
const dbConfig = config.get('DB');

const connection = mysql.createConnection(dbConfig);

connection.connect(
    (err) => {
        if (err) throw err;
    });

module.exports = {
    addPost(title, content) {

        connection.query("INSERT INTO posts(title, content) VALUES(?,?);", [title, content], (err) => {
            if (err) throw err;

            console.log("A new post has been added!");
        });

    },
    deletePost(id) {
        connection.query("DELETE FROM posts WHERE id = ?;", id, (err) => {
            if (err) throw err;

            console.log("A post has been deleted!");
        });
    },
    getPost(id) {
        let posts = [];
        return new Promise( (resolve, reject) =>
            connection.query("SELECT id, title, content, date_format(date, '%e %b %Y') AS date FROM posts WHERE id = ?;", id,(err, results, fields) => {
                if (err) throw reject(err);

                results.forEach((row) => {
                    posts.push({
                        id: row.id,
                        title: row.title,
                        content: row.content,
                        date: row.date
                    });
                });

                resolve(posts[0]);
            })
        );
    },
    getPosts() {
        let posts = [];
        return new Promise( (resolve, reject) =>
            connection.query("SELECT id, title, MID(content,1,150) AS description, date_format(date, '%e %b %Y') AS date FROM posts ORDER BY id DESC;", (err, results, fields) => {
                if (err) throw reject(err);

                results.forEach((row) => {
                    posts.push({
                        id: row.id,
                        title: row.title,
                        description: row.description,
                        date: row.date
                    });
                });

                resolve(posts);
            })
        );
    },
    updatePost(id, title, content) {
        connection.query("UPDATE posts SET title=?, content=? WHERE id=?;", [title, content, id], (err) => {
            if (err) throw err;

            console.log("A post has been edited!");
        });

    },
};


