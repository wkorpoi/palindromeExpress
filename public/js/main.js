const btns = document.querySelectorAll('.delete')

btns.forEach((btn)=>{
  btn.addEventListener("click", deleteWord)
})

function deleteWord(event) { 
  const _id = event.target.value 
  window.location.reload()
  fetch('delete', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id
    })
  })

}
