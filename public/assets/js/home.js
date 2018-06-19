// const request = require('request');
$(document).ready(() => {

    const postScrapeData = () => {
        console.log('function triggered');
        $.get('/api/scrape')
            .then(data => {
                console.log(data);
                console.log('get route worked');
                window.location.href = '/';

            }).catch(err => {
            console.log(err);
        })
    };
    const toggleSaveArticle = articleId => {
        $.ajax({
            url: `/api/article/${articleId}`,
            method: "PUT",
            data: {saved: true}
        }).then(data => {
            console.log(data);
            window.location.href = '/';
        }).catch(err => {
            console.error(err);
        })
    };
    const toggleDeleteArticle = articleId => {
        $.ajax({
            url: `/api/article/${articleId}`,
            method: "PUT",
            data: {saved: false}
        }).then(data => {
            console.log(data);
            window.location.href = '/saved';
        }).catch(err => {
            console.error(err);
        })
    };

    $(document).on('click', () => {
        console.log('working?');
    });
    $(document).on('click', '.scrape', e => {
        console.log('button working');
        e.preventDefault();
        postScrapeData();
    });
    $(document).on('click', '.save-btn', function (e) {
        const id = $(this).attr('data-id');
        toggleSaveArticle(id);
    });
    $(document).on('click', '.del-btn', function () {
        const id = $(this).attr('data-id');
        toggleDeleteArticle(id);

    });
    $(document).on('click', '.note-btn', function (e) {
        const id = $(this).attr('data-id');
        const data = {
            _id: id
        };
        console.log(`data: ${JSON.stringify(data)}`);
        $.ajax({
            url: `/api/notes/${id}`,
            method: 'GET',
            data: data
        }).then(notes => {
            $('#saveNote').attr('data-id', id);
            const note_area = $('.saved-notes');
            note_area.empty();

            notes.forEach(note => {

                note.notes.forEach( noteId => {
                    console.log(`id: ${JSON.stringify(noteId)}`);
                    note_area
                        .append(
                            `<div class="card" id="${id}">
                                <card class="card-body">${noteId.noteText}</card>
                                <button class="btn btn-alarm float-right" data-noteId="${id}" data-id="${noteId._id}" 
                                id="note-delete">Delete</button>
                                </div>`
                        );
                })

            })


        }).catch(err => {
            console.log(`Error is: ${err}`)
        })
        $('#note-modal').modal('show');

    });
    $(document).on('click', '#saveNote', function (e) {
        // console.log($('#noteInput').val());
        const data = {
            _id: $(this).attr('data-id'),
            noteText: $('#noteInput').val()
        };
        console.log(`data: ${JSON.stringify(data)}`);
        $.ajax({
            url: '/api/notes',
            method: 'POST',
            data: data
        }).then(data => {
            console.log('anything');
            console.log(data);
            location.reload();
        }).catch(err => {
            console.log(err);
        })
    });

    $(document).on('click', '#note-delete', function() {
        const note_id = $(this).attr('data-id');
        const article_id = $(this).attr('data-noteid');
        const data = {
            note_id: note_id,
            article_id: article_id
        };


        console.log(`note id: ${note_id}, article id: ${article_id}`);
        $.ajax({
            url: `/api/articles/${note_id}`,
            method: `DELETE`,
            data: data
        }).then( deleteInfo => {
            console.log(`Delete info: ${deleteInfo}`);
            window.location.href = '/saved';
        })
    })


});

