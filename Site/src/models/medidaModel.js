var database = require("../database/config");

function buscarUltimasMedidasCpu(serialNumber, limite_linhas) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top ${limite_linhas}
                        Registro, 
                        CONVERT(varchar, Horario, 108) as momento_grafico
                    FROM vwConsumo
                    WHERE NumeroSerial = '${serialNumber}' AND Componente = 'cpu'
                    ORDER BY ID DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        Registro, 
                        DATE_FORMAT(Horario,'%H:%i:%s') as momento_grafico
                    FROM vwConsumo
                    WHERE NumeroSerial = '${serialNumber}' AND Componente = 'cpu'
                    ORDER BY ID DESC LIMIT ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasCondicaoCpu(serialNumber) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select 
                            CONVERT(varchar, Horario, 111) as 'Data',
                            round(avg(Registro),2) as 'CPU'	
                        from vwConsumo
                            where Componente = 'cpu' 
                            and NumeroSerial = '${serialNumber}' 
                            and cast(Horario as time) between '10:00:00' and '23:59:00'
                        group by CONVERT(varchar, Horario, 111)
						order by CONVERT(varchar, Horario, 111) desc;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
                            round(avg(Registro),2) as 'CPU'	
                        from vwConsumo 
                            where Componente = 'cpu'
                            and NumeroSerial = '${serialNumber}' 
                            and cast(Horario as time) between '10:00:00' and '23:59:00'
                        group by cast(Horario as date)
                        order by cast(Horario as date) desc limit 7;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasCondicaoRam(serialNumber) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select 
                            CONVERT(varchar, Horario, 111) as 'Data',
                            round(avg(Registro),2) as 'RAM'	
                        from vwConsumo
                            where Componente = 'ram' 
                            and NumeroSerial = '${serialNumber}' 
                            and cast(Horario as time) between '10:00:00' and '23:59:00'
                        group by CONVERT(varchar, Horario, 111)
						order by CONVERT(varchar, Horario, 111) desc;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
                            round(avg(Registro),2) as 'RAM'	
                        from vwConsumo 
                            where Componente = 'ram'
                            and NumeroSerial = '${serialNumber}'
                            and cast(Horario as time) between '10:00:00' and '23:59:00'
                        group by cast(Horario as date)
                        order by cast(Horario as date) desc limit 7;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasCondicaoDisco(serialNumber) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select 
                            CONVERT(varchar, Horario, 111) as 'Data',
                            round(avg(Registro),2) as 'Disco'	
                        from vwConsumo
                            where Componente = 'disco' 
                            and NumeroSerial = '${serialNumber}' 
                            and cast(Horario as time) between '10:00:00' and '23:59:00'
                        group by CONVERT(varchar, Horario, 111)
						order by CONVERT(varchar, Horario, 111) desc;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
                            DATE_FORMAT(Horario,'%Y/%m/%d') as 'Data',
                            round(avg(Registro),2) as 'Disco'	
                        from vwConsumo 
                            where Componente = 'disco'
                            and NumeroSerial = '${serialNumber}' 
                            and cast(Horario as time) between '10:00:00' and '23:59:00'
                        group by cast(Horario as date)
                        order by cast(Horario as date) desc limit 7;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidasOciosidade(serialNumber, limite_linhas) {
    
    var instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} usoUsuario, usoOcioso,
        FORMAT(datahora,'%H:%m:%s') as datahora from tbOciosidade where fkMaquina = '${serialNumber}' 
         order by idRegistro desc;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select usoUsuario, usoOcioso,
        DATE_FORMAT(datahora,'%H:%i:%s') as datahora from tbOciosidade where fkMaquina = '${serialNumber}' 
         order by idRegistro desc limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRam(serialNumber, limite_linhas) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top ${limite_linhas}
                        Registro, 
                        CONVERT(varchar, Horario, 108) as momento_grafico
                    FROM vwConsumo
                    WHERE NumeroSerial = '${serialNumber}' AND Componente = 'ram'
                    ORDER BY ID DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        Registro, 
                        DATE_FORMAT(Horario,'%H:%i:%s') as momento_grafico
                    FROM vwConsumo
                    WHERE NumeroSerial = '${serialNumber}' AND Componente = 'ram'
                    ORDER BY ID DESC LIMIT ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDisco(serialNumber) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1 Registro FROM vwConsumo WHERE componente = 'disco' and NumeroSerial = '${serialNumber}' ORDER BY ID DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT Registro FROM vwConsumo WHERE componente = 'disco' and NumeroSerial = '${serialNumber}' ORDER BY ID DESC LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRede(seralNumber, limite_linhas) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top ${limite_linhas}
                        mbEnviados, 
                        mbRecebidos,
                        CONVERT(varchar, dataHora, 108) as momento_grafico
                    FROM vwRede
                    WHERE fkMaquina = '${seralNumber}'
                    ORDER BY ID DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        mbEnviados,
                        mbRecebidos, 
                        DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico
                    FROM vwRede
                    WHERE fkMaquina = '${seralNumber}'
                    ORDER BY ID DESC LIMIT ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasPacotes(seralNumber, limite_linhas) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top ${limite_linhas}
                        pacotesEnviados, 
                        pacotesRecebidos,
                        CONVERT(varchar, dataHora, 108) as momento_grafico
                    FROM vwRede
                    WHERE fkMaquina = '${seralNumber}'
                    ORDER BY ID DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        pacotesEnviados, 
                        pacotesRecebidos, 
                        DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico
                    FROM vwRede
                    WHERE fkMaquina = '${seralNumber}'
                    ORDER BY ID DESC LIMIT ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function buscarMaxDisco(serialNumber) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT valorMaximo FROM vwMaquina WHERE componente = 'disco' and NumeroSerial = '${serialNumber}'`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT valorMaximo FROM vwMaquina WHERE componente = 'disco' and NumeroSerial = '${serialNumber}'`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMaxRam(serialNumber) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT valorMaximo FROM vwMaquina WHERE componente = 'ram' and NumeroSerial = '${serialNumber}'`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT valorMaximo FROM vwMaquina WHERE componente = 'ram' and NumeroSerial = '${serialNumber}'`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoRealCpu(serialNumber) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top 1
                        Registro, 
                        CONVERT(varchar, Horario, 108) as momento_grafico
                        FROM vwConsumo where NumeroSerial = '${serialNumber}' and Componente = 'cpu'
                    order by ID desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        Registro, 
                        DATE_FORMAT(Horario,'%H:%i:%s') as momento_grafico 
                        FROM vwConsumo where NumeroSerial = '${serialNumber}' and Componente = 'cpu'
                    ORDER BY ID DESC LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealTempoUso(serialNumber) {
    
    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {       
        instrucaoSql = `select top 1 usoUsuario, usoOcioso,
        FORMAT(datahora,'%H:%m:%s') as datahora from tbOciosidade where fkMaquina = '${serialNumber}' 
         order by idRegistro desc;`;
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select usoUsuario, usoOcioso,
        DATE_FORMAT(datahora,'%H:%i:%s') as datahora from tbOciosidade where fkMaquina = '${serialNumber}' 
         order by idRegistro desc limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRam(serialNumber) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top 1
                        Registro, 
                        CONVERT(varchar, Horario, 108) as momento_grafico 
                        FROM vwConsumo where NumeroSerial = '${serialNumber}' and Componente = 'ram'
                    order by ID desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        Registro, 
                        DATE_FORMAT(Horario,'%H:%i:%s') as momento_grafico 
                        FROM vwConsumo where NumeroSerial = '${serialNumber}' and Componente = 'ram'
                    ORDER BY ID DESC LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRede(serialNumber) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top 1
                        mbEnviados,
                        mbRecebidos, 
                        CONVERT(varchar, dataHora, 108) as momento_grafico 
                        FROM vwRede where fkMaquina = '${serialNumber}'
                    order by ID desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        mbEnviados,
                        mbRecebidos, 
                        DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico 
                        FROM vwRede where fkMaquina = '${serialNumber}'
                    ORDER BY ID DESC LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasTemp(serialNumber, limite_linhas) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top ${limite_linhas}
                            Temperatura, 
                            CONVERT(varchar, Horario, 108) as momento_grafico
                            from vwTemp
                            WHERE NumeroSerial = '${serialNumber}'
                            ORDER BY Horario DESC;
                        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                            Temperatura, 
                            DATE_FORMAT(Horario,'%H:%i:%s') as momento_grafico
                            FROM vwTemp 
                            WHERE NumeroSerial = '${NumeroSerial}'
                            ORDER BY Horario DESC
                            LIMIT ${limite_linhas};
                        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasProcCpu(serialNumber, limite_linhas) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP ${limite_linhas} CONVERT(varchar, [dbo].[tbRegistro].dataHora, 108) AS dataHora, registro, processo, usoCpu 
                        FROM [dbo].[tbRegistro], [dbo].[tbComponente], [dbo].[tbProcesso] WHERE fkComponente = idComponente 
                        AND tipo = 'cpu' AND [dbo].[tbComponente].fkMaquina = '${serialNumber}' AND [dbo].[tbRegistro].dataHora = 
                        [dbo].[tbProcesso].dataHora ORDER BY idRegistro DESC;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT DATE_FORMAT(tbRegistro.dataHora,'%H:%i:%s') AS dataHora, registro, processo, usoCpu 
                        FROM tbRegistro, tbComponente, tbProcesso 
                        WHERE fkComponente = idComponente AND tipo = 'cpu' AND tbComponente.fkMaquina = '${serialNumber}' AND tbRegistro.dataHora = tbProcesso.dataHora 
                        ORDER BY idRegistro DESC LIMIT ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealPacotes(serialNumber) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top 1
                        pacotesEnviados,
                        pacotesRecebidos, 
                        CONVERT(varchar, dataHora, 108) as momento_grafico
                        FROM vwRede where fkMaquina = '${serialNumber}'
                    order by ID desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        pacotesEnviados,
                        pacotesRecebidos,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico 
                        FROM vwRede where fkMaquina = '${serialNumber}'
                    ORDER BY ID DESC LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealProcCpu(serialNumber) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1 CONVERT(varchar, [dbo].[tbRegistro].dataHora, 108) AS dataHora, metricaMaxima, registro, processo, usoCpu
                        FROM [dbo].[tbRegistro], [dbo].[tbComponente], [dbo].[tbProcesso] WHERE fkComponente = idComponente
                        AND tipo = 'cpu' AND [dbo].[tbComponente].fkMaquina = '${serialNumber}' AND [dbo].[tbRegistro].dataHora =
                        [dbo].[tbProcesso].dataHora ORDER BY idRegistro DESC`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT DATE_FORMAT(tbRegistro.dataHora,'%H:%i:%s') AS dataHora, registro, processo, usoCpu
                        FROM tbRegistro, tbComponente, tbProcesso
                        WHERE fkComponente = idComponente AND tipo = 'cpu' AND tbComponente.fkMaquina = '${serialNumber}' AND tbRegistro.dataHora = tbProcesso.dataHora
                        ORDER BY idRegistro DESC LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealTemp(serialNumber) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1
                            Temperatura,
                            CONVERT(varchar, Horario, 108) as momento_grafico
                            from vwTemp
                            WHERE NumeroSerial = '${serialNumber}'
                            ORDER BY Horario DESC;`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
                            Temperatura,
                            DATE_FORMAT(Horario,'%H:%i:%s') as momento_grafico
                            FROM vwTemp
                            WHERE NumeroSerial = '${serialNumber}'
                            ORDER BY Horario DESC
                            LIMIT 1;
                        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosPlacaRede(serialNumber) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                        macAddress,
                        ipv4,
                        netmask4
                        FROM tbRede where fkMaquina = '${serialNumber}'`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        macAddress,
                        ipv4,
                        netmask4 
                        FROM tbRede where fkMaquina = '${serialNumber}'`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasProcRam(serialNumber, limite_linhas) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP ${limite_linhas} CONVERT(varchar, [dbo].[tbRegistro].dataHora, 108) AS dataHora, metricaMaxima, registro,
                        processo, usoRam FROM [dbo].[tbRegistro], [dbo].[tbComponente], [dbo].[tbProcesso] WHERE fkComponente = idComponente AND
                        tipo = 'ram' AND [dbo].[tbComponente].fkMaquina = '${serialNumber}' AND [dbo].[tbRegistro].dataHora =
                        [dbo].[tbProcesso].dataHora ORDER BY idRegistro DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT DATE_FORMAT(tbRegistro.dataHora,'%H:%i:%s') AS dataHora, metricaMaxima, registro, processo, usoRam
                        FROM tbRegistro, tbComponente, tbProcesso WHERE fkComponente = idComponente AND tipo = 'ram'
                        AND tbComponente.fkMaquina = '${serialNumber}' AND tbRegistro.dataHora = tbProcesso.dataHora
                        ORDER BY idRegistro DESC LIMIT ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarClockEmTempoReal(serialNumber) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1
                            Clock
                            FROM vwTemp
                            WHERE NumeroSerial = '${serialNumber}'
                            ORDER BY Horario DESC;`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
                            Clock
                            FROM vwTemp
                            WHERE NumeroSerial = '${serialNumber}'
                            ORDER BY Horario DESC
                            LIMIT 1;
                        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
                
function buscarMedidasEmTempoRealProcRam(serialNumber) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1 CONVERT(varchar, [dbo].[tbRegistro].dataHora, 108) AS dataHora, metricaMaxima, registro, processo, usoRam
                        FROM [dbo].[tbRegistro], [dbo].[tbComponente], [dbo].[tbProcesso] WHERE fkComponente = idComponente
                        AND tipo = 'ram' AND [dbo].[tbComponente].fkMaquina = '${serialNumber}' AND [dbo].[tbRegistro].dataHora =
                        [dbo].[tbProcesso].dataHora ORDER BY idRegistro DESC`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT DATE_FORMAT(tbRegistro.dataHora,'%H:%i:%s') AS dataHora, metricaMaxima, registro, processo, usoRam
                        FROM tbRegistro, tbComponente, tbProcesso WHERE fkComponente = idComponente AND tipo = 'ram'
                        AND tbComponente.fkMaquina = '${serialNumber}' AND tbRegistro.dataHora = tbProcesso.dataHora
                        ORDER BY idRegistro DESC LIMIT 1`;
    } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    return
}

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidasCpu,
    buscarUltimasMedidasRam,
    buscarUltimasCondicaoCpu,
    buscarUltimasCondicaoRam,
    buscarUltimasCondicaoDisco,
    buscarMedidasEmTempoRealCpu,
    buscarUltimasMedidasRede,
    buscarUltimasMedidasPacotes,
    buscarMedidasEmTempoRealRam,
    buscarUltimasMedidasDisco,
    buscarMedidasEmTempoRealRede,
    buscarMedidasEmTempoRealPacotes,
    obterDadosPlacaRede,
    buscarMaxDisco,
    buscarMaxRam,
    buscarUltimasMedidasTemp,
    buscarMedidasEmTempoRealTemp,
    buscarClockEmTempoReal,
    buscarUltimasMedidasProcCpu,
    buscarMedidasEmTempoRealProcCpu,
    buscarUltimasMedidasProcRam,
    buscarMedidasEmTempoRealProcRam,
    buscarUltimasMedidasOciosidade,
    buscarMedidasEmTempoRealTempoUso
}
