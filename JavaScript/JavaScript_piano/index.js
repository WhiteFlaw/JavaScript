import { audio_data_list, audio_type_list } from "./data.js";
import { generateDom } from "./util.js";

let typeIndex = 0

function init() {
    const typeDom = audio_type_list.map((type, index) => {
        return `<div onclick="setType(${index})" class="type">${type}</div> `;
    })
    const keyDom = audio_data_list.map((data) => {
        return `<li onclick="create(${data.id})" class="key ${data.key.length === 3 ? 'bkey' : 'wkey'}"> · </li> `;
    })
    const blockDom = audio_data_list.map((data, index) => {
        if (data.key.length !== 3) return `<li onclick="create(${data.id})" class="key block"}"></li>`;
    })
    document.getElementById('type-list').innerHTML = `Pitch: ${generateDom(typeDom)}`;
    document.getElementById('key-list').innerHTML = generateDom(keyDom);
    document.getElementById('block-list').innerHTML = generateDom(blockDom);
    document.getElementById('typeNow').innerHTML = `Now: ${audio_type_list[0]}`;
}

function setType(index) { // 不能直接传type
    typeIndex = index.toString()
    document.getElementById('typeNow').innerHTML = `Now: ${audio_type_list[index]}`;
}

function create(id) {
    // 创建音频上下文
    const audioCtx = new AudioContext();
    // 创建音调控制对象
    const oscillator = audioCtx.createOscillator();
    // 创建音量控制对象
    const gainNode = audioCtx.createGain();
    // 音调音量关联
    oscillator.connect(gainNode);
    // 音量和设备关联
    gainNode.connect(audioCtx.destination);
    // 音调类型指定为正弦波
    oscillator.type = audio_type_list[typeIndex];
    // 设置音调频率
    oscillator.frequency.value = audio_data_list[id].hz;
    // 先把当前音量设为0
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    // 0.01秒时间内音量从刚刚的0变成1，线性变化
    gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
    // 声音走起
    oscillator.start(audioCtx.currentTime);
    // 1秒时间内音量从刚刚的1变成0.001，指数变化
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime + 1);
    // 1秒后停止声音
    oscillator.stop(audioCtx.currentTime + 1);
}

init();