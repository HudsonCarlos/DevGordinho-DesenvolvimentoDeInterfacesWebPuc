    var id_Input_Pesquisa = document.getElementById("pesquisa-git")
    var id_Result_Pesquisa = document.getElementById("result-pesquisa")
    var id_repos = document.getElementById("repos")
    var url = "https://api.github.com/users"
    var user_Name = "HudsonCarlos"
    const count = 7
    const sort = "created: ascs"
    
    async function GetUser(user_Name) {
        const profileresponse = await fetch(
            `${url}/${user_Name}`
        )
    
        const reposresponse = await fetch(
            `${url}/${user_Name}/repos?per_page=${count}&sort=${sort}`
        )
        
        //console.log(reposresponse)

        const result_Pesquisa = await profileresponse.json()
        const repos = await reposresponse.json()
            
        return {result_Pesquisa, repos}
    }
    
    function showprofile(user) {
        let output = ''
        
        output += `
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
               <div class="row">
                   <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                       <img src="${user.avatar_url}" class="card-img-top">
                   </div>
                   <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8">
                       <h1>${user.name}</h1>
                   </div>
               </div>
               <div class="row">
                    <ul class="nav justify-content-center">
                        <li class="nav-item">Repositórios: <span class="badge badge-success">${user.public_repos}</span></li>
                        <li class="nav-item"> .Seguidores: <span class="badge badge-primary">${user.followers}</span></li>
                        <li class="nav-item">. Seguindo: <span class="badge badge-info">${user.following}</span></li>
                    </ul>
                </div>    
                <div class="row">
                    <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block">ver perfil</a>
                </div>
            </div>
        `
        
        id_Result_Pesquisa.innerHTML = output
    }
    
    function showrepos(repos) {
        let output = '<h1>Repositórios</h1>'
    
        repos.forEach(repo => {
            output += `
                <div class="card card-body mt-2">
                <div class="row">
                    <div class="col-md-6"><a href="${repo.html_url}" target="_black">${repo.name}</a></div>
                    <div class="col-md-6">                    
                        <span class="badge badge-success">Linguagem: ${repo.language}</span>
                        <span class="badge badge-success">Criado: ${repo.created_at}</span>
                        <span class="badge badge-success">Visibilidade: ${repo.visibility}</span>
                        <span class="badge badge-success">Ultima atualização: ${repo.updated_at}</span>

                        <span class="badge badge-primary">stars: ${repo.stargazers_count}</span>
                        <span class="badge badge-success">watch: ${repo.watchers_count}</span>
                        <span class="badge badge-warning">forks: ${repo.forks_count}</span>
                    </div>
                </div>
            </div>`
            })
    
    
        id_repos.innerHTML = output
    }
    
    id_Input_Pesquisa.addEventListener("keyup", e => {
        const user = e.target.value
    
        if (user.length > 2) {
            GetUser(user).then(res => {
                showprofile(res.result_Pesquisa)
                showrepos(res.repos)
            })
        }
        
    })

    window.addEventListener('load', GetUser(user_Name).then(res => {
        showprofile(res.result_Pesquisa)
        showrepos(res.repos)
    }))