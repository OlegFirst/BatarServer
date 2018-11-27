<?php header('Content-Type:text/html;charset=UTF-8'); ?>
<!DOCTYPE html>
<html>
<head>
	<?php include "head.php"; ?>
</head>
<body>
	
	<!-- Fixed header -->
	<header>
		<!-- Top menu. 'navController' -->
		<nav id="topNav">
			<ul class="topNav screenWidth">
				<li class="topNav-item">
					<a class="topNav-item-element" href="#" onclick="navController_topNav(0)"></a>
				</li>
				<li class="topNav-item">
					<a class="topNav-item-element" href="#" onclick="navController_topNav(1)"></a>
				</li>
				<li class="topNav-item">
					<a class="topNav-item-element" href="#" onclick="navController_topNav(2)"></a>
				</li>
				<li class="topNav-item">
					<a class="topNav-item-element" href="#" onclick="navController_topNav(3)"></a>
				</li>
				<li class="topNav-item">
					<a class="topNav-item-element" href="#" onclick="navController_topNav(4)"></a>
				</li>
				<li class="topNav-item">
					<a class="topNav-item-element" href="#" onclick="navController_topNav(5)"></a>
				</li>
				<li class="topNav-item">
					<a class="topNav-item-element" href="#" onclick="navController_topNav(6)"></a>
				</li>
			</ul>
		</nav>
		<!-- Caption -->
		<div id="caption" class="screenWidth">
			<h3 id="title"></h3>
			<div id="messageBox">
				<p id="messageBoxSuccess" class="alert alert-success"></p>
				<p id="messageBoxInfo" class="alert alert-info"></p>
				<p id="messageBoxDelete">
					<button type="button" onclick="deleteController_OK()"></button>
				</p>
			</div>
		</div>
	</header>
	
	<!-- Left nav menu. 'navController' -->
	<nav id="leftNav" class="container leftNav-disabled">
		<ul class="list-group">
			<li id="leftNavCreate" class="list-group-item" onclick="navController_leftNav(1)">Створити таблицю</li>
			<li id="leftNavDelete" class="list-group-item" onclick="navController_leftNav(2)">Видалити таблицю</li>
			<li id="deleteCancel" class="list-group-item" onclick="navController_leftNav(3)">Відмінити видалення</li>
			<li id="leftNavEdit" class="list-group-item" onclick="navController_leftNav(4)">Редагувати таблицю</li>
			<li id="editCancel" class="list-group-item" onclick="navController_leftNav(5)">Відмінити редагування</li>
		</ul>
	</nav>
	
	<!-- Show content. 'mainController' -->
	<article id="content" class="container screenWidth">
		<section id="section"></section>		
	</article>
	
	<!-- Create table in DB. 'createController' -->
	<section id="create" class="container screenWidth">
		<div class="table-outer">
			<h3 class="table-title">Створити таблицю</h3>
			<div class="table-outer-next"></div>
			<div class="table-buttons">
				<button type="button" onclick="createController_cancel()">Cancel</button>
				<button type="button" onclick="createController_OK()">OK</button>
			</div>
		</div>
		<!-- Messages -->
		<div id="createInfo" class="alert alert-info"></div>
	</section>
	
	<!-- Edit table. 'editController' -->
	<section id="edit" class="container screenWidth">
		<div class="table-outer">
			<h3 class="table-title"></h3>
			<div class="table-outer-next"></div>
			<div class="table-buttons">
				<button type="button" onclick="editController_cancel()">Cancel</button>
				<button type="button" onclick="editController_OK()">OK</button>
			</div>
		</div>
		<!-- Messages -->
		<div id="editInfo" class="alert alert-info"></div>
	</section>
	
	<!-- Insert image or file from folder. 'scanDirController' -->
	<section id="scanDir">
		<?php include "../services/scanDir/scanDir.html"; ?>
		<div id="image"></div>
	</section>
	
</body>
</html>