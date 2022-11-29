function Sort(cadena: string) {
  return cadena.split('').sort().join('');
}

function SumSalary(time_start: string, time_end: string, salary_per_hour: number, factor: number) {
  let tmp_timeStart = time_start.split(':');
  let tmp_timeEnd = time_end.split(':');

  let init_hour = parseInt(tmp_timeStart[0]);
  let end_hour = parseInt(tmp_timeEnd[0]);

  let simple = 0;
  let extra = 0;
  for (let index = init_hour; index < end_hour - 1; index++) {
    if (index >= 8 && index <= 18) {
      simple += 1
    }
    else {
      extra += 1;
    }
  }

  let sum = (simple - 1) * salary_per_hour + (extra - 1) * salary_per_hour * factor;
  return `El salario total del dia es ${sum}`;
}

function Sort_Without_Repeated(nums: number[]) {
  let dict = {};
  let i = 0;

  while(i< nums.length){
    if(dict.hasOwnProperty(nums[i])){
      nums.splice(dict[nums[i]], 1);
      i-=1;
    }
    else{
      dict[nums[i]] = i;
    }
    i+=1;
  }

  return nums;
}
