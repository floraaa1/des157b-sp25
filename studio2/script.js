(function(){
    'use strict';
  
    let globalData;
    let numDataPoints;
  
    async function getData(){
      const water = await fetch('data/water.json');
      const data  = await water.json();
      const dataPoints = Object.keys(data);
      globalData    = Object.values(data);
      numDataPoints = dataPoints.length;
      console.log(globalData, numDataPoints);
    
      showwaterInfo(0, globalData);
    }
  
    function showwaterInfo(point, data){
      const item = data[point];
  
      document.querySelector('#time'   ).textContent = item.time;
      document.querySelector('#amount' ).textContent = item.amount;
      document.querySelector('#reminder').textContent = item.reminder;
  
      const iconDiv = document.querySelector('#icon');
      iconDiv.innerHTML = '<i class="fa-solid fa-glass-water fa-bounce"></i>';
  
     
      const glass = iconDiv.querySelector('i.fa-glass-water');
  
      const ratio = point / (numDataPoints - 1);
      const hue   = Math.round(240 - 240 * ratio);
  
      glass.style.color = `hsl(${hue}, 60%, 75%)`;
    }
  

    let prevLoc = -1;
    document.addEventListener('mousemove', event => {
      const section    = window.innerWidth / numDataPoints;
      const changeTime = Math.floor(event.clientX / section);
  
      if (changeTime !== prevLoc
          && changeTime >= 0
          && changeTime < numDataPoints) {
        showwaterInfo(changeTime, globalData);
        prevLoc = changeTime;
      }
    });
  
    getData();
  })();
  