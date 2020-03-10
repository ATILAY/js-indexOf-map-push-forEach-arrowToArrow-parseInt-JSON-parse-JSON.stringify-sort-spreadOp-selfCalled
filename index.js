
////////////////////////
var randomItemGenerator = function(n) {
var result = []
for (var i = 0; i < n; i++) {
    //Math.random()
var parentId = parseInt(Math.random() * n)
result.push({ id: i, name: 'item-' + i, parentId: parentId })
}
return result
}
 
/* randomItemGenerator fonksiyonu, parent child ilişkisindeki item listesini
id, parentId ile belirlenmiş düz bir liste halinde vermektedir.
Sizden istediğimiz parentId ile belirlenmiş üst item'in childrenlarının içine doldurulmasıdır.
Eğer parentId si yok veya listede bulunamadı ise, çıktının en üst itemlarından biri olarak oluşturulmalıdır.
convertToTree Fonksiyon Çıktısı Şu Şekilde Olmalıdır. 
[
{id:id,name:name,children:[]},
{id:id,name:name,children:[{id:id,name:name,children[...]}]},
{id:id,name:name,children:[...]},
.....
]
*/
///

function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}
    ///////////////////////////////////////////////////
  
    var newSuperClone = [];
    function solution(arr = [], deep = 0){
        
        for(i = 0; i < arr.length; i++){
            let itemParsedParent = parseInt(arr[i].parentId);
            
            let temp = JSON.parse( JSON.stringify( { parentId: arr[i].parentId,
                name: arr[i].name, 
                children:[]
             }) );
            newSuperClone.push(temp);
            

        }//for

        return newSuperClone;
    }//func sol
    //
    function orderViaID(arr){
        function compare(a, b) {
            // 
            const pA = a.parentId;
            const pB = b.parentId;
          
            let comparison = 0;
            if (pA > pB) {
              comparison = 1;
            } else if (pA < pB) {
              comparison = -1;
            }
            return comparison;
          }//func
          
          return arr.sort(compare);
          
    }//func or
    ///////////////////////////////////////////////////
///
 
var itemList = randomItemGenerator(10);
var convertToTree = function(itemList =[]) {

    //console.log("ITEMLIST:::",itemList);
    var whatAreParentIds = [];
    var freqParentIds = [];
    for(i = 0; i < itemList.length; i++){
        //if parentid does not exit
        if((itemList[i].parentId==undefined)||(itemList[i].parentId==='')){
            
            var parentIdExist = parseInt(Math.random() * itemList.length);
            itemList.push({ ...itemList[i], parentId: parentIdExist });
        }//if parentid does not exit
        const parsedParentId = parseInt(itemList[i].parentId);
        whatAreParentIds = [...whatAreParentIds  ,parsedParentId];
        
        //if(array[i] == value){n++}
    }
    whatAreParentIds = whatAreParentIds.sort();
    //console.log("whatAreParentIds::",whatAreParentIds);

    for(let i = 0; i<whatAreParentIds.length; i++){
        const temp = getOccurrence(whatAreParentIds,whatAreParentIds[i]);
        freqParentIds[i] = temp;
        
    }//for
    //console.log("freqParentIds::",freqParentIds);

    var goDeep = Math.max(...freqParentIds);
    //console.log("goDeep::",goDeep);
    var truth = solution(itemList, goDeep);
    //console.log("TRUTH::", truth);
    let k= 0;
    while( goDeep>k ){
        for(let j=0; j<itemList.length;j++ ){    
            const parsedTruthParentId = parseInt(truth[j].parentId);
            for(let i=0; i<itemList.length;i++ ){
                const parsedParentId = parseInt(itemList[i].parentId);
                
                if(truth[j].children.indexOf(itemList[i]) == -1){
                    //const parsedTruthchildID = parseInt(truth[i].children[goDeep].id);
                    if( parsedTruthParentId === parsedParentId){
                    truth[j].children.push(itemList[i]);
                    }//if parsed
                    //console.log("truth[i].children::",truth[i].children);

                    //if(parsedTruthchildID !== ){}//if


                }//if
            }//for i
        }//for j
        k = k +1;
    }//while
    truth = orderViaID(truth);
    ////CHANGE parentId syntax to ID
    const newtruth = truth.map( item =>{
        //NORMAL SARTLARDA ID ler UNIQUE OLMALI
        //AMA VERILEN ORNEKTE NAME-* DEGISIKLIK GOSTERDIGI ICIN 
        //DATA KAYBINA SEBEP OLMAMAK ICIN TUTTUM
        //console.log("NEWtruth:::", newtruth); İLE demek istedigimi anlıcaksınız
        return {ID: item.parentId, name: item.name, children:item.children};

    });
    //console.log("NEWtruth:::", newtruth);




    return newtruth;
// TODO: Bu fonksiyonun içeriğinin doldurulması istenmektedir

}

convertToTree(itemList);