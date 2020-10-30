'use strict';

app.get('/read', bearerAuth, permissions('read'), ...)
app.post('/add', bearerAuth, permissions('create'), ...)
app.put('/change', bearerAuth, permissions('update'), ...)
app.delete('/remove', bearerAuth, permissions('delete'), ...)