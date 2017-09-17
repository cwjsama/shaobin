/**
 * Created by Administrator on 2017/8/20.
 */
//获取后台数据
var userUrl = "../../../php/Interface/user.php";
var inProdUrl = "../../../php/Interface/inproduct.php";
var outProdUrl = "../../../php/Interface/outproduct.php";
function Modue(url,data,async,success){
    $.ajax({
        url:url,
        type:"POST",
        dataType:"JSON",
        data:data,
        async:true,
        success:function(result){
            success(result)
        },
        error:function(e){
            alert(e);
        }
    });
}
//用户信息
var User = {
    init: function () {

    },
    getInfo:function (user_id,success) {
        var data = {
            type:2,
            user_id:user_id
        }
        new Modue(userUrl,data,false,function (result) {
            success(result);
        });
    },
    isLogin:function (user_id,password,success) {
        var data = {
            type:0,
            user_id:user_id,
            password:md5(password)
        }
        new Modue(userUrl,data,false,function (result) {
            success(result);
        });
    },
	addAmin:function(data,success){
        new Modue(userUrl,data,false,function (result) {
            success(result);
        });
	},
	deleteAmin:function(user_id,success){
		var data = {
            type:4,
            user_id:user_id
        }
        new Modue(userUrl,data,false,function (result) {
            success(result);
        });
	},
	modifyAmin:function(data,success){
        new Modue(userUrl,data,false,function (result) {
            success(result);
        });
	},
	selectVagueAmin:function(searchText,success){
		 var data = {
            type:5,
			search_Text:searchText
        }
        new Modue(userUrl,data,false,function (result) {
            success(result);
        });
	}
}

//进货订单信息
var InProduct = {
	addInProduct:function(data,success){
		new Modue(inProdUrl,data,false,function (result) {
            success(result);
        });
	},
	getInProductInfo:function (inProduct_id,success) {
        var data = {
            type:2,
            inProduct_id:inProduct_id
        }
        new Modue(inProdUrl,data,false,function (result) {
            success(result);
        });
    },
	deleteInProduct:function(inProduct_id,success){
		var data = {
            type:4,
            inProduct_id:inProduct_id
        }
        new Modue(inProdUrl,data,false,function (result) {
            success(result);
        });
	},
	modifyInProduct:function(data,success){
        new Modue(inProdUrl,data,false,function (result) {
            success(result);
        });
	},
	selectVagueInProduct:function(searchText,success){
		 var data = {
            type:5,
			search_Text:searchText
        }
        new Modue(inProdUrl,data,false,function (result) {
            success(result);
        });
	}
}
//出货订单信息
var OutProduct = {
	addOutProduct:function(data,success){
		new Modue(outProdUrl,data,false,function (result) {
            success(result);
        });
	},
	getOutProductInfo:function (outProduct_id,success) {
        var data = {
            type:2,
            outProduct_id:outProduct_id
        }
        new Modue(outProdUrl,data,false,function (result) {
            success(result);
        });
    },
	deleteOutProduct:function(outProduct_id,success){
		var data = {
            type:4,
            outProduct_id:outProduct_id
        }
        new Modue(outProdUrl,data,false,function (result) {
            success(result);
        });
	},
	modifyOutProduct:function(data,success){
        new Modue(outProdUrl,data,false,function (result) {
            success(result);
        });
	},
	selectVagueOutProduct:function(searchText,success){
		 var data = {
            type:5,
			search_Text:searchText
        }
        new Modue(outProdUrl,data,false,function (result) {
            success(result);
        });
	}
}

//查询进出货信息
var product = {
	table:null,
	thead:null,
	tbody:null,
	btn:null,
	productInput:null,
	resultDom:null,
	init:function(){
		this.table = $(".table");
		this.thead = this.table.find("thead");
		this.tbody = this.table.find("tbody");
		this.btn = $("#btn");
		this.productInput = $("#productText"); 
		this.resultDom = $("#result");
		var that = this;
		var searchText = getUrlParam("searchText");
		if(searchText!=null) this.earchResult(searchText);
		this.btn.click(function(){
			var productId = that.productInput.val();
			that.earchResult(productId);
		});
		this.productInput.keyup(function (e) {//捕获文档对象的按键弹起事件  
			if (e.keyCode == 13) {//按键信息对象以参数的形式传递进来了  
				var productId = that.productInput.val();
				that.earchResult(productId);
			}  
		});
	},
	earchResult:function(productId){
		var that = this;
		if(productId.length==0 || productId.replace(/\s+/g,"").length==0){ alert("条形码不能为空"); return;}
			if(productId.length!==20 || productId.replace(/\s+/g,"").length!=20){ alert("请正确输入条码"); return;}
			var type = productId.substring(0,3);
			var theadHTML = "";
			if(type=="OUT"){
				theadHTML = "<tr>"+
								"<th class='text-center'>ID</th>"+
								"<th class='text-center'>出库ID</th>"+
								"<th class='text-center'>客户商</th>"+
								"<th class='text-center'>经手人</th>"+
								"<th class='text-center'>出库时间</th>"+
								"<th class='text-center'>备注</th>"+
							"</tr>";
				OutProduct.getOutProductInfo(productId,function(result){
					var productInfo = result.data[0];
					if(result.result){
						that.tbody.html("<tr>"+
						"<td align='center'>"+productInfo.id+"</td>"+
						"<td align='center'>"+productInfo.outProduct_id+"</td>"+
						"<td align='center'>"+productInfo.purchase+"</td>"+
						"<td align='center'>"+productInfo.administrator+"</td>"+
						"<td align='center'>"+productInfo.time+"</td>"+
						"<td align='center'>"+productInfo.remark+"</td>"+
					"</tr>");
					that.resultDom.html("");
					}else{
						that.tbody.html('');
						that.resultDom.html("查无结果");
					}
				});
			}else{
				theadHTML = "<tr>"+
								"<th class='text-center'>ID</th>"+
								"<th class='text-center'>进库ID</th>"+
								"<th class='text-center'>供货商</th>"+
								"<th class='text-center'>经手人</th>"+
								"<th class='text-center'>进库时间</th>"+
								"<th class='text-center'>备注</th>"+
							"</tr>";
				InProduct.getInProductInfo(productId,function(result){
					var productInfo = result.data[0];
					if(result.result){
						that.tbody.html("<tr>"+
						"<td align='center'>"+productInfo.id+"</td>"+
						"<td align='center'>"+productInfo.inProduct_id+"</td>"+
						"<td align='center'>"+productInfo.supplier+"</td>"+
						"<td align='center'>"+productInfo.administrator+"</td>"+
						"<td align='center'>"+productInfo.time+"</td>"+
						"<td align='center'>"+productInfo.remark+"</td>"+
					"</tr>");
					that.resultDom.html("");
					}else{
						that.tbody.html('');
						that.resultDom.html("查无结果");
					}
				});
			}
			this.thead.html(theadHTML);
	}
}

//添加管理员
var AddAmin = {
	init:function(){
		//权限判断
		if(window.identity!=2){
			alert("对不起,您的无权管理管理员！！！");
			window.history.back();
		}
		var from = $("#from");
		var username = from.find("#username");
		var password = from.find("#password");
		var password2 = from.find("#password2");
		var name = from.find("#name");
		var identity = from.find("#identity");
		var button = from.find(" button");
		button.click(function(){
			var usernameVal = username.val();
			var passwordVal = password.val();
			var passwordVal2 = password2.val();
			var nameVal = name.val();
			var identityVal = identity.val();
			if(usernameVal.length==0 || passwordVal.length===0 || passwordVal2.length===0 || nameVal.length===0){
				alert("请完善所有带'*'的必填项信息");
			}else{
				if(usernameVal.length>=6 && usernameVal.length<=12){
					if(passwordVal==passwordVal2){
						var data = {
							type:1,
							arr:{
								user_id:usernameVal,
								password:md5(passwordVal),
								name:nameVal,
								identity:identityVal,
								disabled:false
							}
						}
						User.addAmin(data,function(result){
							if(!result.result){
								alert(result.data);
							}else{
								alert("添加成功");
								 var fag = confirm("是否继续添加？");
								if(fag){
									from[0].reset();
								}else{
									window.location.href = "lst.htm";
								}
							}
						});
					}else{
						alert("两次密码不一致");
					}
				}else{
					alert("请输入有效的用户名(6~12位字符)");
				}
			}
		});
	}
}

//管理员列表
var AdminList = {
	tableBody:null,
	
    init:function () {
		//权限判断
		if(window.identity!=2){
			alert("对不起,您的无权管理管理员！！！");
			window.history.back();
		}
        var lst = $("#lst");
        this.tableBody = lst.find("table").find("tbody");
		var that = this;
        var searchText = getUrlParam("searchText");
		if(searchText==null){
			User.getInfo('',function (result) {
				if(result.result){
					var list = result.data;
					that.addList(list);
				}else{
					alert("查无结果");
					return ;	
				}
			});
		}else{
			User.selectVagueAmin(searchText,function (result) {
				if(result.result){
					var list = result.data;
					that.addList(list);
				}else{
					alert("查无结果");
					return ;	
				}
			});
		}
    },
	addList:function(list){
		var html = "";
		for (var i=0;i<list.length;i++){
			html+='<tr>'+
				'<td align="center">'+list[i].id+'</td>'+
				'<td align="center">'+list[i].user_id+'</td>'+
				'<td align="center">'+list[i].name+'</td>'+
				'<td align="center">'+identityText(list[i].identity)+'</td>'+
				'<td align="center">'+
				'<a href="edit.htm?userId='+list[i].user_id+'" class="btn btn-primary btn-sm shiny">'+
				'<i class="fa fa-edit"></i> 编辑'+
				'</a>'+
				'<a href="#" onClick="AdminList.warning(\'确实要删除\', \''+list[i].user_id+'\')" class="btn btn-danger btn-sm shiny">'+
				'<i class="fa fa-trash-o"></i> 删除'+
				'</a>'+
				'</td>'+
				'</tr>';
		}
		this.tableBody.html(html);
		function identityText(id){
			var text = "";
			if(id==0){
				text = "普通管理员";
			}else if(id==1){
				text = "仓库管理员";
			}else if(id==2){
				text = "超级管理员"
			}else{
				text = "普通管理员"
			}
			return text;
		}
	},
    warning:function (str,userId) {
        var fag = confirm(str+userId+"吗？");
		var e = event;
        if(fag){
			User.deleteAmin(userId,function(result){
				if(result.result){
					$(e.target).parents("tr").slideUp("slow");
				}else{
					alert("删除失败，请稍后再试");
				}
			});
        }
    }
}
//编辑管理员信息
var EditAmin = {
	init:function(){
		//权限判断
		if(window.identity!=2){
			alert("对不起,您的无权管理管理员！！！");
			window.history.back();
		}
		var from = $("#edtFrom");
		var username = from.find("#username");
		var password = from.find("#password");
		var password2 = from.find("#password2");
		var name = from.find("#name");
		var identity = from.find("#identity");
		var button = from.find("button");
		var user_id = getUrlParam("userId");
		//获取个人信息
		User.getInfo(user_id,function(result){
			if(result.result){
				var obj = result.data[0];
				username.val(obj.user_id);
				name.val(obj.name);
				identity.val(obj.identity);
			}else{
				alert("查无此管理员，可能已被删除");
				window.history.back();
			}
		});
		
		button.click(function(){
			var nameVal = name.val();
			var identityVal = identity.val();
			var passwordVal = password.val();
			var passwordVal2 = password2.val();
			if(nameVal.length==0 || passwordVal.length==0 || passwordVal2.length==0){
				alert("请完善信息在提交！！！");
			}else{
				if(passwordVal==passwordVal2){
					var data = {
							type:3,
							arr:{
								user_id:user_id,
								password:md5(passwordVal),
								name:nameVal,
								identity:identityVal,
								disabled:false
							}
						}
						User.modifyAmin(data,function(result){
							if(!result.result){
								alert(result.data);
							}else{
								alert("修改成功！！！");
								window.location.href = "lst.htm";
							}
						});
				}else{
					alert("两次密码不一致！！！");
				}
			}
		});
		
	}
}


//添加进货订单
var AddInProduct = {
	init:function(){
		//权限判断
		if(identity==0){
			alert("对不起,您的无权管理进出货信息！！！");
			window.history.back();
		}
		var from = $("#addInProdFrom");
		var inProduct_id = from.find("#inProduct_id");
		var supplier = from.find("#supplier");
		var administrator = from.find("#administrator");
		var administrator2 = from.find("#administrator2");
		var timeData = from.find("#timeData");
		var remark = from.find("#remark");
		var code = from.find("#code");
		var button = from.find("button");
		
		var id = "IN"+getDataStamp();
		
		inProduct_id.val(id);
		this.onLoadCode();
		
		
		/**管理员信息获取**/
		User.getInfo('',function(result){
			if(result.result){
                var list = result.data;
                var html = "<option value=''>手动输入</option>";
                for (var i=0;i<list.length;i++){
					html+="<option value='"+list[i].name+"'>"+list[i].name+"</option>";
				}
				administrator.html(html);
			}
		})
		
		administrator.change(function(){
			if($(this).val()==0){
				administrator2.removeAttr("disabled");
			}else{
				administrator2.attr("disabled","true");
			}
		});
		
		button.click(function(){
			var inProduct_idVal = inProduct_id.val();
			var supplierVal = supplier.val();
			var administratorVal1 = administrator.val();
			var administratorVal2 = administrator2.val();
			var administratorVal = administratorVal1;
			var timeDataVal = timeData.val();
			var remarkVal = remark.val();
			if(administratorVal1==''){
				administratorVal = administratorVal2;
			}
			if(supplierVal.length==0 || administratorVal.length===0 || timeDataVal.length===0){
				alert("请完善所有带'*'的必填项信息");
			}else{
				var data = {
					type:1,
					arr:{
						inProduct_id:inProduct_idVal,
						supplier:supplierVal,
						administrator:administratorVal,
						time:timeDataVal,
						remark:remarkVal
					}
				}
				InProduct.addInProduct(data,function(result){
					if(!result.result){
						alert(result.data);
					}else{
						alert("添加成功");
						if(confirm("是否打印条形码？")){
							window.location.href = "../barCode/print.htm?id="+inProduct_idVal;
						}else{
							 var fag = confirm("是否继续添加？");
							if(fag){
								document.location.reload();
							}else{
								window.location.href = "lst.htm";
							}
						}
					}
				});
			}
		});
	},
	onLoadCode:function(){
		var id = "IN"+getDataStamp();
		$("#inProduct_id").val(id);
		$("#code").attr("src","http://localhost:8080/repertory/php/barcodegen/test_1D.php?text="+$("#inProduct_id").val());
	}
}

//进货列表
var InProductList = {
	lst:null,
	tableBody:null,
	
	init:function () {
		//权限判断
		if(identity==0){
			alert("对不起,您的无权管理进出货信息！！！");
			window.history.back();
		}
        this.lst = $("#lst");
        this.tableBody = this.lst.find("table").find("tbody");
        var searchText = getUrlParam("searchText");
		var that = this;
		if(searchText==null){
			 InProduct.getInProductInfo('',function (result) {
				that.addList(result);
			});
		}else{
			InProduct.selectVagueInProduct(searchText,function(result){
				that.addList(result);
			});
		}
    },
	addList:function(result){
		var list = result.data;
		if(!result.result){
			alert("查无结果");
			return;
		}
		var html = "";
			for (var i=0;i<list.length;i++){
				html+='<tr>'+
					'<td align="center">'+list[i].id+'</td>'+
					'<td align="center">'+list[i].inProduct_id+'</td>'+
					'<td align="center">'+list[i].supplier+'</td>'+
					'<td align="center">'+list[i].administrator+'</td>'+
					'<td align="center">'+list[i].time+'</td>'+
					'<td align="center">'+list[i].remark+'</td>'+
					'<td align="center">'+
					'<a href="../barCode/print.htm?id='+list[i].inProduct_id+'" class="btn btn-primary btn-sm shiny">'+
					'<i class="fa fa-edit"></i> 条形码'+
					'</a>'+
					'<a href="edit.htm?inProduct_id='+list[i].inProduct_id+'" class="btn btn-primary btn-sm shiny">'+
					'<i class="fa fa-edit"></i> 编辑'+
					'</a>'+
					'<a href="#" onClick="InProductList.warning(\'确实要删除\', \''+list[i].inProduct_id+'\')" class="btn btn-danger btn-sm shiny">'+
					'<i class="fa fa-trash-o"></i> 删除'+
					'</a>'+
					'</td>'+
					'</tr>';
			}
			this.tableBody.html(html);
	},
    warning:function (str,inProduct_id) {
        var fag = confirm(str+inProduct_id+"吗？");
		var e = event;
        if(fag){
			InProduct.deleteInProduct(inProduct_id,function(result){
				if(result.result){
					$(e.target).parents("tr").slideUp("slow");
				}else{
					alert("删除失败，请稍后再试");
				}
			});
        }
    }
}
//进货编辑
var EditInProductt = {
	init:function(){
		//权限判断
		if(identity==0){
			alert("对不起,您的无权管理进出货信息！！！");
			window.history.back();
		}
		var from = $("#editInProdFrom");
		var inProduct_id = from.find("#inProduct_id");
		var supplier = from.find("#supplier");
		var administrator = from.find("#administrator");
		var administrator2 = from.find("#administrator2");
		var timeData = from.find("#timeData");
		var remark = from.find("#remark");
		var code = from.find("#code");
		var button = from.find("button");
		
		var inProductId = getUrlParam("inProduct_id");
		inProduct_id.val(inProductId);
		this.onLoadCode();
		
		
		/**管理员信息获取**/
		User.getInfo('',function(result){
			if(result.result){
                var list = result.data;
                var html = "<option value=''>手动输入</option>";
                for (var i=0;i<list.length;i++){
					html+="<option value='"+list[i].name+"'>"+list[i].name+"</option>";
				}
				administrator.html(html);
			}
		});

		InProduct.getInProductInfo(inProductId,function (result) {
            if(result.result){
                var list = result.data[0];
				inProduct_id.val(list.inProduct_id);
				supplier.val(list.supplier);
				administrator2.val(list.administrator);
				timeData.val(list.time);
				remark.val(list.remark);
			}else{
				alert("查无此进货信息，可能已被删除");
				window.history.back();
			}
		});
		
		
		administrator.change(function(){
			if($(this).val()==0){
				administrator2.removeAttr("disabled");
			}else{
				administrator2.attr("disabled","true");
				administrator2.val('');
			}
		});
		
		button.click(function(){
			var inProduct_idVal = inProduct_id.val();
			var supplierVal = supplier.val();
			var administratorVal1 = administrator.val();
			var administratorVal2 = administrator2.val();
			var administratorVal = administratorVal1;
			var timeDataVal = timeData.val();
			var remarkVal = remark.val();
			if(administratorVal1==''){
				administratorVal = administratorVal2;
			}
			if(supplierVal.length==0 || administratorVal.length===0 || timeDataVal.length===0){
				alert("请完善所有带'*'的必填项信息");
			}else{
				var data = {
					type:3,
					arr:{
						inProduct_id:inProduct_idVal,
						supplier:supplierVal,
						administrator:administratorVal,
						time:timeDataVal,
						remark:remarkVal
					}
				}
				InProduct.modifyInProduct(data,function(result){
					if(!result.result){
						alert(result.data);
					}else{
						alert("修改成功");
						window.location.href = "lst.htm";
					}
				});
			}
		});
	},
	onLoadCode:function(){
		$("#code").attr("src","http://localhost:8080/repertory/php/barcodegen/test_1D.php?text="+$("#inProduct_id").val());
	}
}

//添加出货订单
var AddOutProduct = {
	init:function(){
		//权限判断
		if(identity==0){
			alert("对不起,您的无权管理进出货信息！！！");
			window.history.back();
		}
		var from = $("#addOutProdFrom");
		var outProduct_id = from.find("#outProduct_id");
		var purchase = from.find("#purchase");
		var administrator = from.find("#administrator");
		var administrator2 = from.find("#administrator2");
		var timeData = from.find("#timeData");
		var remark = from.find("#remark");
		var code = from.find("#code");
		var button = from.find("button");
		
		var id = "OUT"+getDataStamp();
		
		outProduct_id.val(id);
		this.onLoadCode();
		
		
		/**管理员信息获取**/
		User.getInfo('',function(result){
			if(result.result){
                var list = result.data;
                var html = "<option value=''>手动输入</option>";
                for (var i=0;i<list.length;i++){
					html+="<option value='"+list[i].name+"'>"+list[i].name+"</option>";
				}
				administrator.html(html);
			}
		})
		
		administrator.change(function(){
			if($(this).val()==0){
				administrator2.removeAttr("disabled");
			}else{
				administrator2.attr("disabled","true");
				administrator2.val('');
			}
		});
		
		button.click(function(){
			var outProduct_idVal = outProduct_id.val();
			var purchaseVal = purchase.val();
			var administratorVal1 = administrator.val();
			var administratorVal2 = administrator2.val();
			var administratorVal = administratorVal1;
			var timeDataVal = timeData.val();
			var remarkVal = remark.val();
			if(administratorVal1==''){
				administratorVal = administratorVal2;
			}
			if(purchaseVal.length==0 || administratorVal.length===0 || timeDataVal.length===0){
				alert("请完善所有带'*'的必填项信息");
			}else{
				var data = {
					type:1,
					arr:{
						outProduct_id:outProduct_idVal,
						purchase:purchaseVal,
						administrator:administratorVal,
						time:timeDataVal,
						remark:remarkVal
					}
				}
				OutProduct.addOutProduct(data,function(result){
					if(!result.result){
						alert(result.data);
					}else{
						alert("添加成功");
						if(confirm("是否打印条形码？")){
							window.location.href = "../barCode/print.htm?id="+outProduct_idVal;
						}else{
							 var fag = confirm("是否继续添加？");
							if(fag){
								document.location.reload();
							}else{
								window.location.href = "lst.htm";
							}
						}
					}
				});
			}
		});
	},
	onLoadCode:function(){
		var id = "IN"+getDataStamp();
		$("#inProduct_id").val(id);
		$("#code").attr("src","http://localhost:8080/repertory/php/barcodegen/test_1D.php?text="+$("#outProduct_id").val());
	}
}

//出货列表
var OutProductList = {
	tableBody:null,
	init:function () {
		//权限判断
		if(identity==0){
			alert("对不起,您的无权管理进出货信息！！！");
			window.history.back();
		}
        var lst = $("#lst");
        this.tableBody = lst.find("table").find("tbody")
        var searchText = getUrlParam("searchText");
		var that = this;
		var that = this;
		if(searchText==null){
			 OutProduct.getOutProductInfo('',function (result) {
				that.addList(result);
			});
		}else{
			OutProduct.selectVagueOutProduct(searchText,function(result){
				that.addList(result);
			});
		}
    },
	addList:function(result){
		if(result.result){
			var list = result.data;
			var html = "";
			for (var i=0;i<list.length;i++){
				html+='<tr>'+
					'<td align="center">'+list[i].id+'</td>'+
					'<td align="center">'+list[i].outProduct_id+'</td>'+
					'<td align="center">'+list[i].purchase+'</td>'+
					'<td align="center">'+list[i].administrator+'</td>'+
					'<td align="center">'+list[i].time+'</td>'+
					'<td align="center">'+list[i].remark+'</td>'+
					'<td align="center">'+
					'<a href="../barCode/print.htm?id='+list[i].outProduct_id+'" class="btn btn-primary btn-sm shiny">'+
					'<i class="fa fa-edit"></i> 条形码'+
					'</a>'+
					'<a href="edit.htm?outProduct_id='+list[i].outProduct_id+'" class="btn btn-primary btn-sm shiny">'+
					'<i class="fa fa-edit"></i> 编辑'+
					'</a>'+
					'<a href="#" onClick="OutProductList.warning(\'确实要删除\', \''+list[i].outProduct_id+'\')" class="btn btn-danger btn-sm shiny">'+
					'<i class="fa fa-trash-o"></i> 删除'+
					'</a>'+
					'</td>'+
					'</tr>';
			}
			this.tableBody.html(html);
		}else{
			alert("查无结果");	
			return;
		}
	},
    warning:function (str,outProduct_id) {
        var fag = confirm(str+outProduct_id+"吗？");
		var e = event;
        if(fag){
			OutProduct.deleteOutProduct(outProduct_id,function(result){
				if(result.result){
					$(e.target).parents("tr").slideUp("slow");
				}else{
					alert("删除失败，请稍后再试");
				}
			});
        }
    }
}
//出货编辑
var EditOutProductt = {
	init:function(){
		//权限判断
		if(identity==0){
			alert("对不起,您的无权管理进出货信息！！！");
			window.history.back();
		}
		var from = $("#editOutProdFrom");
		var outProduct_id = from.find("#outProduct_id");
		var purchase = from.find("#purchase");
		var administrator = from.find("#administrator");
		var administrator2 = from.find("#administrator2");
		var timeData = from.find("#timeData");
		var remark = from.find("#remark");
		var code = from.find("#code");
		var button = from.find("button");
		
		var outProductId = getUrlParam("outProduct_id");
		outProduct_id.val(outProductId);
		this.onLoadCode();
		
		
		/**管理员信息获取**/
		User.getInfo('',function(result){
			if(result.result){
                var list = result.data;
                var html = "<option value=''>手动输入</option>";
                for (var i=0;i<list.length;i++){
					html+="<option value='"+list[i].name+"'>"+list[i].name+"</option>";
				}
				administrator.html(html);
			}
		});

		OutProduct.getOutProductInfo(outProductId,function (result) {
            if(result.result){
                var list = result.data[0];
				outProduct_id.val(list.outProduct_id);
				purchase.val(list.purchase);
				administrator2.val(list.administrator);
				timeData.val(list.time);
				remark.val(list.remark);
			}else{
				alert("查无此出货信息，可能已被删除");
				window.history.back();
			}
		});
		
		
		administrator.change(function(){
			if($(this).val()==0){
				administrator2.removeAttr("disabled");
			}else{
				administrator2.attr("disabled","true");
				administrator2.val('');
			}
		});
		
		button.click(function(){
			var outProduct_idVal = outProduct_id.val();
			var purchaseVal = purchase.val();
			var administratorVal1 = administrator.val();
			var administratorVal2 = administrator2.val();
			var administratorVal = administratorVal1;
			var timeDataVal = timeData.val();
			var remarkVal = remark.val();
			if(administratorVal1==''){
				administratorVal = administratorVal2;
			}
			if(purchaseVal.length==0 || administratorVal.length===0 || timeDataVal.length===0){
				alert("请完善所有带'*'的必填项信息");
			}else{
				var data = {
					type:3,
					arr:{
						outProduct_id:outProduct_idVal,
						purchase:purchaseVal,
						administrator:administratorVal,
						time:timeDataVal,
						remark:remarkVal
					}
				}
				OutProduct.modifyOutProduct(data,function(result){
					if(!result.result){
						alert(result.data);
					}else{
						alert("修改成功");
						window.location.href = "lst.htm";
					}
				});
			}
		});
	},
	onLoadCode:function(){
		$("#code").attr("src","http://localhost:8080/repertory/php/barcodegen/test_1D.php?text="+$("#outProduct_id").val());
	}
}

//条形码
var Code = {
	id:null,
	init:function(){
		this.id = getUrlParam("id").toUpperCase();
		$("#code").attr("src","http://localhost:8080/repertory/php/barcodegen/test_1D.php?text="+this.id);
		$("#code").click(function(){
			Code.init();
		});
	},
	printme:function(){
		var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
		LODOP.PRINT_INIT("打印条形码");    
		//LODOP.ADD_PRINT_BARCODE(0,0,300,70,"128B",this.id);
		//LODOP.ADD_PRINT_HTM(70,110,80,23,"内部使用");
		LODOP.ADD_PRINT_URL(0,0,360,87,"http://localhost:8080/repertory/php/barcodegen/test_1D.php?text="+this.id);
		LODOP.PRINT_DESIGN();
	}
}

//登录
var Login = {
    init:function () {
        //登录界面
        var login = $("#login");
        var subBtn = login.find("input[type='button']");
        var usernameDom = login.find("input[name='username']");
        var passwordDom = login.find("input[name='password']");
        subBtn.click(function () {
            var usernameVal = usernameDom.val();
            var passwordVal = passwordDom.val();
            if(usernameVal.length<6 || usernameVal.length>12){
                alert("请输入有效的用户名(6~12位字符)");
            }else {
                User.isLogin(usernameVal,passwordVal,function (result) {
                    if(result.result){
                        /**if(result.data[0].disabled=="1"){
                            alert("您当前的用户名已被禁用，请联系超级管理员！！！")
                        }else {
                            
                        }*/
						sessionStorage.setItem("user",JSON.stringify(result.data[0]));
                        location.href = "../index/index.htm";
                    }else {
                        alert("用户名或密码不正确！！！");
                    }
                });
            }
        });
    }
}

//首页
var index = $("#index");
//头部
var Top = {
    init:function () {
        var top = $("#top");
        var nameDom = top.find(".profile").find("span");
        var dropdownFooterDom = top.find(".dropdown-footer");
        var user = JSON.parse(sessionStorage.getItem("user"));
        nameDom.html(user.name);
        $(dropdownFooterDom.get(0)).click(function () {
            window.sessionStorage.clear();
            location.href = "../Login/login.htm";
        });
        $(dropdownFooterDom.get(1)).click(function () {
            location.href = "../Admin/edit.htm?userId="+user.user_id;
        });
    }
}
//获取url中的参数
//===================
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(getCharFromUtf8(r[2])); return null; //返回参数值
};
function getCharFromUtf8(str) {  
	var cstr = "";  
	var nOffset = 0;  
	if (str == "")  
	return "";  
		str = str.toLowerCase();  
		nOffset = str.indexOf("%e");  
	if (nOffset == -1)  
	return str;  
	while (nOffset != -1) {  
			cstr += str.substr(0, nOffset);  
			str = str.substr(nOffset, str.length - nOffset);  
	if (str == "" || str.length < 9)  
	return cstr;  
			cstr += utf8ToChar(str.substr(0, 9));  
			str = str.substr(9, str.length - 9);  
			nOffset = str.indexOf("%e");  
		}  
	return cstr + str;  
} 

//将编码转换成字符  
function utf8ToChar(str) {  
	var iCode, iCode1, iCode2;  
		iCode = parseInt("0x" + str.substr(1, 2));  
		iCode1 = parseInt("0x" + str.substr(4, 2));  
		iCode2 = parseInt("0x" + str.substr(7, 2));  
	return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));  
} 
//获取当前时间戳
function getDataStamp(){
	var myDate = new Date();
		var y = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
		var m = myDate.getMonth();       //获取当前月份(0-11,0代表1月)
		var d = myDate.getDate();    
		var H = myDate.getHours();       //获取当前小时数(0-23)
		var M = myDate.getMinutes();     //获取当前分钟数(0-59)
		var S = myDate.getSeconds();     //获取当前秒数(0-59)
		if(m<10){m='0'+m;}
		if(d<10){d='0'+d;}
		if(H<10){H='0'+H;}
		if(M<10){M='0'+M}
		if(S<10){S='0'+S}
		var ran = "";
		for(var i=0;i<4;i++){
			ran+=Math.floor(Math.random()*10+1);
		}
	return y+''+m+''+d+''+H+''+M+''+S+ran
}