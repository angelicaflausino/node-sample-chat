module.exports.iniciar = function(app, req, res){
    var dadosForm = req.body;
    
    req.assert('apelido', 'Informe o seu apelido').notEmpty();
    req.assert('apelido', 'Seu apelido deverá ter entre 3 e 15 caracteres').len(3, 15);

    var erros = req.validationErrors();

	if(erros){
		res.render("index", {errors : erros});
		return;
	}

	app.get('io').emit(
		'mensagem',
		{apelido: dadosForm.apelido, msg: ' acabou de entrar no chat'}
        );

	res.render("chat", {dadosForm : dadosForm});
};