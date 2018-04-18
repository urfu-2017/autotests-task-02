module.exports = function formatDate(date) {

    const yyyy=new Date().getFullYear();
    const mm=new Date().getMonth()+1;
    const dd=new Date().getDate();
    const ch=new Date().getUTCHours()+5;
    const min=new Date().getUTCMinutes();
    array = date.match(/\d+/g);
    if (array[2]>31) throw new Error('Incorrect day');
    if (array[1]>12||array[1]<1) throw new Error('Incorrect month');
    if (array[0]%4==0&&array[1]==2&&array[2]>29) throw new Error('Incorrect day');
    if (array[0]%4!=0&&array[1]==2&&array[2]>28) throw new Error('Incorrect day');
    if (array[3]>23||array[4]>59) throw new Error('Incorrect time');
    if (array[0]>yyyy&&array[1]>mm&&array[2]>dd) throw new Error('Future date');
    if (array[0]>yyyy) throw new Error('Future year');
    if (array[0]==yyyy&&array[1]>mm) throw new Error('Future month');
    if (array[0]==yyyy&&array[1]==mm&&array[2]>dd) throw new Error('Future day');
    if (array[0]==yyyy&&array[1]==mm&&array[2]==dd&&(array[3]>ch||array[4]>min)) throw new Error('Future time');

    const months=["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    if (array[0]==yyyy&&array[1]==mm&&array[2]==dd) return (array[3]+':'+array[4]);//сегодня
    else if (array[0]==yyyy&&array[1]==mm&&array[2]==dd-1) return ('вчера в '+array[3]+':'+array[4]); //вчера
    if (array[0]==yyyy&&array[1]<=mm&&array[2]<dd-1) return (array[2]+' '+months[parseInt(array[1])-1]+' в '+array[3]+':'+array[4]); //в этом году но давно
    if (array[0]<yyyy) return(array[2]+'.'+array[1]+'.'+array[0]+' в '+array[3]+':'+array[4]); //не в этом году




};
