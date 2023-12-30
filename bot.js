// TOKEN - 6794312088:AAGYiSsNY3LS--eUuY9bqLTcOCYPqY-WKWI
// const fs = require('fs')
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6441824238:AAHR7HFRFrvBvbIjkVZ1WRyAU9ZoqA0uWws'; // tester
// const token1 = '6737237616:AAHcG3mshTu8I1tfgF3RAF_ah0g4C-gWLwg'; // fetcher logger
const chatID = 5147388273

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
// const bot1 = new TelegramBot(token1, { polling: true });

const get_date = () => {
    let date = new Date()
    let date_str = date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    let ind_date = new Date(date_str)
    let dt = ('0' + ind_date.getDate().toString()).slice(-2,)
    let mon = ('0' + (ind_date.getMonth() + 1).toString()).slice(-2,)
    let yr = ind_date.getFullYear().toString()
    let hr = ('0' + ind_date.getHours().toString()).slice(-2,)
    let min = ('0' + ind_date.getMinutes().toString()).slice(-2,)
    let sec = ('0' + ind_date.getSeconds().toString()).slice(-2,)
    return `\nDate --> [${dt}/${mon}/${yr}]\nTime --> ${hr}:${min}:${sec}\nBot Process ID : ${process.pid}\n`
}

const getAdmins = () => {
    // let obj = fs.readFileSync('./tg-admins.json', { encoding: 'utf-8' })
    let adminIds = Object.keys((JSON.parse(obj)).ids)
    return [adminIds, JSON.parse(obj)]
}
// console.log(getAdmins())

const pushTgAdmins = (obj) => {
    let str = JSON.stringify(obj)
    // fs.writeFileSync('./tg-admins.json', str, { encoding: 'utf-8' })
}

const getStats = (chatid, fname, lname, username) => {
    let userstats = ''
    let userstatsHtml = ''
    if (username) {
        userstats = `\nChatID : ${chatid}\nName : ${fname} ${lname}\nUsername : @${username}`
        userstatsHtml = `\nChatID : <code>${chatid}</code>\nName : <code>${fname} ${lname}</code>\nUsername : @${username}`
    } else {
        userstats = `\nChatID : ${chatid}\nName : ${fname} ${lname}`
        userstatsHtml = `\nChatID : <code>${chatid}</code>\nName : <code>${fname} ${lname}</code>`
    }
    return [userstats, userstatsHtml]
}

bot.sendMessage(chatID, `Bot Process ID : <code>${process.pid}</code>`, { parse_mode: 'HTML' })

// Start -------------------------------------------------------------------------------------------
bot.on('polling_error', (err) => {
    console.log(get_date())
    console.log('Some polling error\n')
    // bot.sendMessage(chatID, 'Some polling error')
})

bot.onText(/.+/, (msg, match) => {
    let chatId = msg.chat.id;
    let fname = msg.from.first_name
    let lname = msg.from.last_name
    let username = msg.from.username
    let [userstats, userstatsHtml] = getStats()
    // console.log(msg)
    bot.sendMessage(chatID, `${userstatsHtml}\n\nMessage --> <code>${msg.text}</code>`, {parse_mode: 'HTML'})
})

module.exports = {bot}