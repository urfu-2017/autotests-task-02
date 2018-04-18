module.exports = function formatDate(date) { 
    // Напишите код форматирования даты в этом месте
    var d = new Date( date ); 
    var today = new Date();  
     
    var dMid = new Date( d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0 ); 
    var todayMid = new Date( today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0 );  
    
    var ms = todayMid - dMid;
    var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    if ( ms == 0 )  return d.getHours().toString() + ':' + d.getMinutes();
    else if ( ms == 1000 * 60 * 60 * 24 )   return 'вчера в ' + d.getHours() + ':' + d.getMinutes();
        else if ( d.getFullYear() == today.getFullYear() )  return d.getDate().toString() + ' ' + months[d.getMonth()] + ' в ' + d.getHours() + ':' + d.getMinutes();
             else  return d.getDate().toString() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' года в ' + d.getHours() + ':' + d.getMinutes();

};
