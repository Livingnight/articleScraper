// const request = require('request');
$(document).ready(() => {

    const postScrapeData = () => {
        console.log('function triggered');
        $.get('/api/scrape').then(data => {
            console.log(data);
            console.log('get route worked');
            window.location.href = '/';
        });
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
            // console.log(`Notes: ${JSON.stringify(notes)}`);
            // console.log(`id: ${id}`);
            const note_area = $('.saved-notes');
            // console.log(`notes: ${notes}`);
            notes.forEach(note => {

                console.log(`Note: ${JSON.stringify(note.notes)}`);
                note.notes.forEach(id => {
                    console.log(`id: ${JSON.stringify(id)}`);
                    // note_area.empty();
                    note_area
                        .append(
                            `<p id="${id._id}">${id.noteText}</p>`
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


});

