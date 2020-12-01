
$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
      
      $('.login-box').hide()
      $('.reg-box').show()
    })
  
    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
      $('.login-box').show()
      $('.reg-box').hide()
    })

    // 从layUI中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 自定义校验规则
    form.verify({

        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        // 确认密码的校验规则
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return '两次密码不一致'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
            if(res.status !== 0){
                // return console.log(res.message);
                return layer.msg(res.message)
            }
            // console.log(res.message);
            layer.msg(res.message)
            $("#link_login").click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 将token存到本地存储里
                localStorage.setItem('token',res.token)
                // 跳转到后台
                location.href='/code/index.html'
            }
        })
    })
  })
