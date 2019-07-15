function Point(x,y) {
    this.X = x;
    this.Y = y;
    this.compare = function (point) {
        if(this.X == point.X && this.Y == point.Y){
            return true;
        }
        return false;
    }
}

/* {
    pawn:1,
    rook:2,
    knight:3,
    bishop:4,
    queen:5,
    king:6
}*/

function Figure(type,iswithe,point) {
    this.IsWhite = iswithe;
    this.Type = type;
    this.Point = point;
    this.compare = function(figure){
        if(this.IsWhite == figure.IsWhite && this.Type == figure.Type && this.Point.compare(figure.Point)){
            return true;
        }
        return false;
    }
}

function Pawn(x,y,isWhite) {
    this.IsWhite = isWhite;
    this.IsSelected = false;
    this.IsDestroyed = false;
    this.DidNotGo = true;
    this.Location = new Point(x,y);
    this.GoPoints = [];
    this.DangerousPoints = [];
    this.DestroyPoints = [];
    this.GoTo = function(pointId) {
        this.Location = this.GoPoints[pointId];
        this.DidNotGo = false;
        this.UpdaterPoints();
    }
    this.UpdaterPoints = function() {
        this.GoPoints = [];
        this.DestroyPoints = [];
        if(this.IsWhite == true){
            this.GoPoints[0] = new Point(this.Location.X,this.Location.Y+1);
            if(this.DidNotGo == true){
                this.GoPoints[1] = new Point(this.Location.X,this.Location.Y+2);
            }
            this.DestroyPoints[0] = new Point(this.Location.X-1,this.Location.Y+1);
            this.DestroyPoints[1] = new Point(this.Location.X+1,this.Location.Y+1);
        }
        else{
            this.GoPoints[0] = new Point(this.Location.X,this.Location.Y-1);
            if(this.DidNotGo == true){
                this.GoPoints[1] = new Point(this.Location.X,this.Location.Y-2);
            }
            this.DestroyPoints[0] = new Point(this.Location.X-1,this.Location.Y-1);
            this.DestroyPoints[1] = new Point(this.Location.X+1,this.Location.Y-1);
        }
    }
    this.IsGoPoint = function (point) {
        for (let i = 0; i < this.GoPoints.length; i++) {
            if(this.GoPoints[i].compare(point)){
                return true;
            }
        }
        return false;
    }
    this.FindGoPoint = function (point) {
        if(this.IsGoPoint(point)){
            for (let i = 0; i < this.GoPoints.length; i++) {
                if(this.GoPoints[i].compare(point)){
                    return i;
                }
            }
        }
    }
}

function Rook(x,y,isWhite) {
    this.IsWhite = isWhite;
    this.IsSelected = false;
    this.IsDestroyed = false;
    this.Location = new Point(x,y);
    this.GoPoints = [];
    this.DangerousPoints = [];
    this.DestroyPoints = [];
    this.GoTo = function(pointId) {
        this.Location = this.GoPoints[pointId];
        this.UpdaterPoints();
    }
    this.UpdaterPoints = function(){
        this.GoPoints = [];
        this.DestroyPoints = [];
        for (let i = 0; i < 8; i++) {
            if(i!=this.Location.X && i!=this.Location.Y){
                this.GoPoints.push(new Point(this.Location.X,i));
                this.GoPoints.push(new Point(i,this.Location.Y));
                /*this.DestroyPoints[i] = new Point(this.Location.X,i);
                this.DestroyPoints[8+i] = new Point(i,this.Location.Y);*/
            }
        }
        this.DestroyPoints = this.GoPoints;
    }
    this.IsGoPoint = function (point) {
        for (let i = 0; i < this.GoPoints.length; i++) {
            if(this.GoPoints[i].compare(point)){
                return true;
            }
        }
        return false;
    }
    this.FindGoPoint = function (point) {
        if(this.IsGoPoint(point)){
            for (let i = 0; i < this.GoPoints.length; i++) {
                if(this.GoPoints[i].compare(point)){
                    return i;
                }
            }
        }
    }
}

function Knight(x,y,isWhite) {
    this.IsWhite = isWhite;
    this.IsSelected = false;
    this.IsDestroyed = false;
    this.Location = new Point(x,y);
    this.GoPoints = [];
    this.DangerousPoints = [];
    this.DestroyPoints = [];
    this.GoTo = function(pointId) {
        this.Location = this.GoPoints[pointId];
        this.UpdaterPoints();
    }
    this.UpdaterPoints = function(){
        this.GoPoints = [];
        this.DestroyPoints = [];
        this.GoPoints[0] = new Point(this.Location.X+2,this.Location.Y+1);
        this.GoPoints[1] = new Point(this.Location.X+2,this.Location.Y-1);
        this.GoPoints[2] = new Point(this.Location.X-2,this.Location.Y+1);
        this.GoPoints[3] = new Point(this.Location.X-2,this.Location.Y-1);
        this.GoPoints[4] = new Point(this.Location.X+1,this.Location.Y+2);
        this.GoPoints[5] = new Point(this.Location.X-1,this.Location.Y+2);
        this.GoPoints[6] = new Point(this.Location.X+1,this.Location.Y-2);
        this.GoPoints[7] = new Point(this.Location.X-1,this.Location.Y-2);
        this.DestroyPoints = this.GoPoints;
        /*this.DestroyPoints[0] = new Point(this.Location.X+2,this.Location.Y+1);
        this.DestroyPoints[1] = new Point(this.Location.X+2,this.Location.Y-1);
        this.DestroyPoints[2] = new Point(this.Location.X-2,this.Location.Y+1);
        this.DestroyPoints[3] = new Point(this.Location.X-2,this.Location.Y-1);
        this.DestroyPoints[4] = new Point(this.Location.X+1,this.Location.Y+2);
        this.DestroyPoints[5] = new Point(this.Location.X-1,this.Location.Y+2);
        this.DestroyPoints[6] = new Point(this.Location.X+1,this.Location.Y-2);
        this.DestroyPoints[7] = new Point(this.Location.X-1,this.Location.Y-2);*/
    }
    this.IsGoPoint = function (point) {
        for (let i = 0; i < this.GoPoints.length; i++) {
            if(this.GoPoints[i].compare(point)){
                return true;
            }
        }
        return false;
    }
    this.FindGoPoint = function (point) {
        if(this.IsGoPoint(point)){
            for (let i = 0; i < this.GoPoints.length; i++) {
                if(this.GoPoints[i].compare(point)){
                    return i;
                }
            }
        }
    }
}

function Bishop(x,y,isWhite) {
    this.IsWhite = isWhite;
    this.IsSelected = false;
    this.IsDestroyed = false;
    this.Location = new Point(x,y);
    this.GoPoints = [];
    this.DangerousPoints = [];
    this.DestroyPoints = [];
    this.GoTo = function(pointId) {
        this.Location = this.GoPoints[pointId];
        this.UpdaterPoints();
    }
    this.UpdaterPoints = function(){
        this.GoPoints = [];
        this.DestroyPoints = [];
        for (let i = 1; i < 8; i++) {
            this.GoPoints.push(new Point(this.Location.X+i,this.Location.Y+i));
            this.GoPoints.push(new Point(this.Location.X-i,this.Location.Y+i));
            this.GoPoints.push(new Point(this.Location.X+i,this.Location.Y-i));
            this.GoPoints.push(new Point(this.Location.X-i,this.Location.Y-i));
        }
        this.DestroyPoints = this.GoPoints;
    }
    this.IsGoPoint = function (point) {
        for (let i = 0; i < this.GoPoints.length; i++) {
            if(this.GoPoints[i].compare(point)){
                return true;
            }
        }
        return false;
    }
    this.FindGoPoint = function (point) {
        if(this.IsGoPoint(point)){
            for (let i = 0; i < this.GoPoints.length; i++) {
                if(this.GoPoints[i].compare(point)){
                    return i;
                }
            }
        }
    }
}

function Queen(x,y,isWhite) {
    this.IsWhite = isWhite;
    this.IsSelected = false;
    this.IsDestroyed = false;
    this.Location = new Point(x,y);
    this.GoPoints = [];
    this.DangerousPoints = [];
    this.DestroyPoints = [];
    this.GoTo = function(pointId) {
        this.Location = this.GoPoints[pointId];
        this.UpdaterPoints();
    }
    this.UpdaterPoints = function(){
        this.GoPoints = [];
        this.DestroyPoints = [];
        for (let i = 0; i < 8; i++) {
            if(i!=this.Location.X && i!=this.Location.Y){
                this.GoPoints.push(new Point(this.Location.X,i));
                this.GoPoints.push(new Point(i,this.Location.Y));
            }
        }
        for (let i = 1; i < 8; i++) {
            this.GoPoints.push(new Point(this.Location.X+i,this.Location.Y+i));
            this.GoPoints.push(new Point(this.Location.X-i,this.Location.Y+i));
            this.GoPoints.push(new Point(this.Location.X+i,this.Location.Y-i));
            this.GoPoints.push(new Point(this.Location.X-i,this.Location.Y-i));
        }
        this.DestroyPoints = this.GoPoints;
    }
    this.IsGoPoint = function (point) {
        for (let i = 0; i < this.GoPoints.length; i++) {
            if(this.GoPoints[i].compare(point)){
                return true;
            }
        }
        return false;
    }
    this.FindGoPoint = function (point) {
        if(this.IsGoPoint(point)){
            for (let i = 0; i < this.GoPoints.length; i++) {
                if(this.GoPoints[i].compare(point)){
                    return i;
                }
            }
        }
    }
}

function King(x,y,isWhite) {
    this.IsWhite = isWhite;
    this.IsSelected = false;
    this.IsDestroyed = false;
    this.Location = new Point(x,y);
    this.GoPoints = [];
    this.DangerousPoints = [];
    this.DestroyPoints = [];
    this.GoTo = function(pointId) {
        this.Location = this.GoPoints[pointId];
        this.UpdaterPoints();
    }
    this.UpdaterPoints = function(){
        this.GoPoints = [];
        this.DestroyPoints = [];
        this.GoPoints[0] = new Point(this.Location.X,this.Location.Y+1);
        this.GoPoints[1] = new Point(this.Location.X,this.Location.Y-1);
        this.GoPoints[2] = new Point(this.Location.X+1,this.Location.Y+1);
        this.GoPoints[3] = new Point(this.Location.X+1,this.Location.Y-1);
        this.GoPoints[4] = new Point(this.Location.X-1,this.Location.Y+1);
        this.GoPoints[5] = new Point(this.Location.X-1,this.Location.Y-1);
        this.GoPoints[6] = new Point(this.Location.X+1,this.Location.Y);
        this.GoPoints[7] = new Point(this.Location.X-1,this.Location.Y);
        this.DestroyPoints = this.GoPoints;
    }
    this.IsGoPoint = function (point) {
        for (let i = 0; i < this.GoPoints.length; i++) {
            if(this.GoPoints[i].compare(point)){
                return true;
            }
        }
        return false;
    }
    this.FindGoPoint = function (point) {
        if(this.IsGoPoint(point)){
            for (let i = 0; i < this.GoPoints.length; i++) {
                if(this.GoPoints[i].compare(point)){
                    return i;
                }
            }
        }
    }
}

function ChessTeam(isWhite) {
    this.IsWhite = isWhite;
    this.Pawns = [];
    this.Rooks = [];
    this.Knights = [];
    this.Bishops = [];
    this.Queens = [];
    this.GroupKing;
    this.GroupLocations = [];
    this.Figures = [];
    this.SetUp = function() {
        if(this.IsWhite == true){
            for (let i = 0; i < 8; i++) {
                this.Pawns[i] = new Pawn(i,1,this.IsWhite);
                this.Pawns[i].UpdaterPoints();
                let tmpP = new Figure(1,this.IsWhite,new Point(i,1));
                this.Figures.push(tmpP);
            }
            this.Rooks[0] = new Rook(0,0,this.IsWhite);
            this.Rooks[0].UpdaterPoints();
            this.Rooks[1] = new Rook(7,0,this.IsWhite);
            this.Rooks[1].UpdaterPoints();
            this.Figures.push(new Figure(2,this.IsWhite,new Point(0,0)));
            this.Figures.push(new Figure(2,this.IsWhite,new Point(7,0)));
            this.Knights[0] = new Knight(1,0,this.IsWhite);
            this.Knights[0].UpdaterPoints();
            this.Knights[1] = new Knight(6,0,this.IsWhite);
            this.Knights[1].UpdaterPoints();
            this.Figures.push(new Figure(3,this.IsWhite,new Point(1,0)));
            this.Figures.push(new Figure(3,this.IsWhite,new Point(6,0)));
            this.Bishops[0] = new Bishop(2,0,this.IsWhite);
            this.Bishops[0].UpdaterPoints();
            this.Bishops[1] = new Bishop(5,0,this.IsWhite);
            this.Bishops[1].UpdaterPoints();
            this.Figures.push(new Figure(4,this.IsWhite,new Point(2,0)));
            this.Figures.push(new Figure(4,this.IsWhite,new Point(5,0)));
            this.Queens[0] = new Queen(3,0,this.IsWhite);
            this.Queens[0].UpdaterPoints();
            this.Figures.push(new Figure(5,this.IsWhite,new Point(3,0)));
            this.GroupKing = new King(4,0,this.IsWhite);
            this.GroupKing.UpdaterPoints();
            this.Figures.push(new Figure(6,this.IsWhite,new Point(4,0)));
        }
        else{
            for (let i = 0; i < 8; i++) {
                this.Pawns[i] = new Pawn(i,6,this.IsWhite);
                this.Pawns[i].UpdaterPoints();
                this.Figures.push(new Figure(1,this.IsWhite,new Point(i,6)));
            }
            this.Rooks[0] = new Rook(0,7,this.IsWhite);
            this.Rooks[0].UpdaterPoints();
            this.Rooks[1] = new Rook(7,7,this.IsWhite);
            this.Rooks[1].UpdaterPoints();
            this.Figures.push(new Figure(2,this.IsWhite,new Point(0,7)));
            this.Figures.push(new Figure(2,this.IsWhite,new Point(7,7)));
            this.Knights[0] = new Knight(1,7,this.IsWhite);
            this.Knights[0].UpdaterPoints();
            this.Knights[1] = new Knight(6,7,this.IsWhite);
            this.Knights[1].UpdaterPoints();
            this.Figures.push(new Figure(3,this.IsWhite,new Point(1,7)));
            this.Figures.push(new Figure(3,this.IsWhite,new Point(6,7)));
            this.Bishops[0] = new Bishop(2,7,this.IsWhite);
            this.Bishops[0].UpdaterPoints();
            this.Bishops[1] = new Bishop(5,7,this.IsWhite);
            this.Bishops[1].UpdaterPoints();
            this.Figures.push(new Figure(4,this.IsWhite,new Point(2,7)));
            this.Figures.push(new Figure(4,this.IsWhite,new Point(5,7)));
            this.Queens[0] = new Queen(3,7,this.IsWhite);
            this.Queens[0].UpdaterPoints();
            this.Figures.push(new Figure(5,this.IsWhite,new Point(3,7)));
            this.GroupKing = new King(4,7,this.IsWhite);
            this.GroupKing.UpdaterPoints();
            this.Figures.push(new Figure(6,this.IsWhite,new Point(4,7)));
        }
    }
    this.UpdateGroupLocations = function() {
        let LocationsTmp = [];
        this.Pawns.forEach(item => {
            if(item.IsDestroyed == false){
                LocationsTmp.push(item.Location);
                item.UpdaterPoints();
            }
        });
        this.Rooks.forEach(item => {
            if(item.IsDestroyed == false){
                LocationsTmp.push(item.Location);
                item.UpdaterPoints();
            }
        });
        this.Knights.forEach(item => {
            if(item.IsDestroyed == false){
                LocationsTmp.push(item.Location);
                item.UpdaterPoints();
            }
        });
        this.Bishops.forEach(item => {
            if(item.IsDestroyed == false){
                LocationsTmp.push(item.Location);
                item.UpdaterPoints();
            }
        });
        this.Queens.forEach(item => {
            if(item.IsDestroyed == false){
                LocationsTmp.push(item.Location);
                item.UpdaterPoints();
            }
        })
        LocationsTmp.push(this.GroupKing.Location);
        this.GroupKing.UpdaterPoints();
        this.GroupLocations = LocationsTmp;
        //return LocationsTmp;
    }
    this.IsBusyPoint = function(point) {
        for (let i = 0; i < this.GroupLocations.length; i++) {
            if(this.GroupLocations[i].compare(point)){
                return true;
            }
        }
        return false;
    }
    this.GoFilterOut = function(array) {
        let tmp = [];
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].GoPoints.length; j++) {
                if(this.IsBusyPoint(array[i].GoPoints[j]) == true){
                    tmp.push(j);
                }
            }
            for (let j = 0; j < tmp.length; j++) {
                array[i].GoPoints.splice(tmp[j],1);
            }
        }
    }
    this.FilterOutGoPoints = function() {
        //let Tmp = this.getGroupLocations();
        this.UpdateGroupLocations();
        /*this.GoFilterOut(this.Pawns);
        this.GoFilterOut(this.Rooks);
        this.GoFilterOut(this.Knights);
        this.GoFilterOut(this.Bishops);
        this.GoFilterOut(this.Queens);
        let tmp = [];
        for (let j = 0; j < this.GroupKing.GoPoints.length; j++) {
            if(this.IsBusyPoint(this.GroupKing.GoPoints[j]) == true){
                tmp.push(j);
            }
        }
        for (let j = 0; j < tmp.length; j++) {
            this.GroupKing.GoPoints.splice(tmp[j],1);
        }*/
    }
    this.FindFigureByPoint = function (point) {
        let ExistPoint = false;
        for (let i = 0; i < this.GroupLocations.length; i++) {
            if(this.GroupLocations[i].compare(point)){
                ExistPoint = true;
                break;
            }
        }
        if(ExistPoint == true){
            for (let i = 0; i < this.Pawns.length; i++) {
                if(this.Pawns[i].Location.compare(point) && this.Pawns[i].IsDestroyed == false){
                    return new Figure(1,this.IsWhite,point);
                }
            }
            for (let i = 0; i < this.Rooks.length; i++) {
                if(this.Rooks[i].Location.compare(point) && this.Rooks[i].IsDestroyed == false){
                    return new Figure(2,this.IsWhite,point);
                }
            }
            for (let i = 0; i < this.Knights.length; i++) {
                if(this.Knights[i].Location.compare(point) && this.Knights[i].IsDestroyed == false){
                    return new Figure(3,this.IsWhite,point);
                }
            }
            for (let i = 0; i < this.Bishops.length; i++) {
                if(this.Bishops[i].Location.compare(point) && this.Bishops[i].IsDestroyed == false){
                    return new Figure(4,this.IsWhite,point);
                }
            }
            for (let i = 0; i < this.Queens.length; i++) {
                if(this.Queens[i].Location.compare(point) && this.Queens[i].IsDestroyed == false){
                    return new Figure(5,this.IsWhite,point);
                }
            }
            if(this.GroupKing.Location.compare(point) && this.GroupKing.IsDestroyed == false){
                return new Figure(6,this.IsWhite,point);
            }

        }
        else{
            return new Figure(0,this.IsWhite,point);
        }
    }
    this.FindFigureByFigure = function (figure) {
        if(figure.IsWhite == this.IsWhite){
            let tmp = this.FindFigureByPoint(figure.Point);
            if(tmp.Type != 0 && figure.Type == tmp.Type){
                switch (tmp.Type) {
                    case 1:
                        for (let i = 0; i < this.Pawns.length; i++) {
                            if(this.Pawns[i].Location.compare(tmp.Point)){
                                return i;
                            }
                        }
                        break;
                    case 2:
                        for (let i = 0; i < this.Rooks.length; i++) {
                            if(this.Rooks[i].Location.compare(tmp.Point)){
                                return i;
                            }
                        }
                        break;
                    case 3:
                        for (let i = 0; i < this.Knights.length; i++) {
                            if(this.Knights[i].Location.compare(tmp.Point)){
                                return i;
                            }
                        }
                        break;
                    case 4:
                        for (let i = 0; i < this.Bishops.length; i++) {
                            if(this.Bishops[i].Location.compare(tmp.Point)){
                                return i;
                            }
                        }
                        break;
                    case 5:
                        for (let i = 0; i < this.Queens.length; i++) {
                            if(this.Queens[i].Location.compare(tmp.Point)){
                                return i;
                            }
                        }
                        break;
                    case 6:
                        if(this.GroupKing.Location.compare(tmp.Point)){
                            return 0;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return false;
    }
    this.EditPointFigure = function (figure,newPoint) {
        for (let i = 0; i < this.Figures.length; i++) {
            if(this.Figures[i].Point.compare(figure.Point)){
                this.Figures[i].Point = newPoint;
                return;
            }
        }
    }
}



function Board() {
    this.TeamsW = new ChessTeam(true);
    this.TeamsW.SetUp();
    this.TeamsW.FilterOutGoPoints();
    this.TeamsD = new ChessTeam(false);
    this.TeamsD.SetUp();
    this.TeamsD.FilterOutGoPoints();
    /*this.FilterPawns = function() {
        let AllObjectLocation = [];
        for (let i = 0; i < this.TeamsW.GroupLocations.length; i++) {
            AllObjectLocation.push(this.TeamsW.GroupLocations[i]);
            AllObjectLocation.push(this.TeamsD.GroupLocations[i]);
        }
        for (let i = 0; i < this.TeamsW.Pawns.length; i++) {
            for (let j = 0; j < AllObjectLocation.length; j++) {
                if(this.TeamsW.Pawns[i].IsDestroyed == false){
                    let DeletePoints = [];
                    this.TeamsW.Pawns[i].GoPoints.forEach(item =>{
                        if(item == AllObjectLocation[j]){
                            DeletePoints.push(item);
                        }
                    });
                    for (let k = 0; k < DeletePoints.length; k++) {
                        this.TeamsW.Pawns[i].GoPoints.splice(DeletePoints[k],1);
                    }
                }
                if(this.TeamsD.Pawns[i].IsDestroyed == false){
                    let DeletePoints = [];
                    this.TeamsD.Pawns[i].GoPoints.forEach(item =>{
                        if(item == AllObjectLocation[j]){
                            DeletePoints.push(item);
                        }
                    });
                    for (let k = 0; k < DeletePoints.length; k++) {
                        this.TeamsD.Pawns[i].GoPoints.splice(DeletePoints[k],1);
                    }
                }
            }
        }
    }*/
    this.GoFigure = function (figure,id) {
        if(figure.IsWhite){
            switch (figure.Type) {
                case 1:
                    //this.TeamsW.Pawns;
                    for (let i = 0; i < this.TeamsW.Pawns.length; i++) {
                        if(this.TeamsW.Pawns[i].Location.compare(figure.Point)){
                            this.TeamsW.Pawns[i].GoTo(id);
                            this.TeamsW.EditPointFigure(figure,this.TeamsW.Pawns[i].Location);
                        }
                    }
                    break;
                case 2:
                    //this.TeamsW.Rooks;
                    for (let i = 0; i < this.TeamsW.Rooks.length; i++) {
                        if(this.TeamsW.Rooks[i].Location.compare(figure.Point)){
                            this.TeamsW.Rooks[i].GoTo(id);
                            this.TeamsW.EditPointFigure(figure,this.TeamsW.Rooks[i].Location);
                        }
                    }
                    break;
                case 3:
                    //this.TeamsW.Knights;
                    for (let i = 0; i < this.TeamsW.Knights.length; i++) {
                        if(this.TeamsW.Knights[i].Location.compare(figure.Point)){
                            this.TeamsW.Knights[i].GoTo(id);
                            this.TeamsW.EditPointFigure(figure,this.TeamsW.Knights[i].Location);
                        }
                    }
                    break;
                case 4:
                    //this.TeamsW.Bishops;
                    for (let i = 0; i < this.TeamsW.Bishops.length; i++) {
                        if(this.TeamsW.Bishops[i].Location.compare(figure.Point)){
                            this.TeamsW.Bishops[i].GoTo(id);
                            this.TeamsW.EditPointFigure(figure,this.TeamsW.Bishops[i].Location);
                        }
                    }
                    break;
                case 5:
                    //this.TeamsW.Queens;
                    for (let i = 0; i < this.TeamsW.Queens.length; i++) {
                        if(this.TeamsW.Queens[i].Location.compare(figure.Point)){
                            this.TeamsW.Queens[i].GoTo(id);
                            this.TeamsW.EditPointFigure(figure,this.TeamsW.Queens[i].Location);
                        }
                    }
                    break;
                case 6: 
                    //this.TeamsW.GroupKing;
                    if(this.TeamsW.GroupKing.Location.compare(figure.Point)){
                        this.TeamsW.GroupKing.GoTo(id);
                        this.TeamsW.EditPointFigure(figure,this.GroupKing.Location);
                    }
                    break;
                default:
                    break;
            }
            this.TeamsW.UpdateGroupLocations();
        }
        else{
            switch (figure.Type) {
                case 1:
                    //this.TeamsD.Pawns;
                    for (let i = 0; i < this.TeamsD.Pawns.length; i++) {
                        if(this.TeamsD.Pawns[i].Location.compare(figure.Point)){
                            this.TeamsD.Pawns[i].GoTo(id);
                            this.TeamsD.EditPointFigure(figure,this.TeamsD.Pawns[i].Location);
                        }
                    }
                    break;
                case 2:
                    //this.TeamsD.Rooks;
                    for (let i = 0; i < this.TeamsD.Rooks.length; i++) {
                        if(this.TeamsD.Rooks[i].Location.compare(figure.Point)){
                            this.TeamsD.Rooks[i].GoTo(id);
                            this.TeamsD.EditPointFigure(figure,this.TeamsD.Rooks[i].Location);
                        }
                    }
                    break;
                case 3:
                    //this.TeamsD.Knights;
                    for (let i = 0; i < this.TeamsD.Knights.length; i++) {
                        if(this.TeamsD.Knights[i].Location.compare(figure.Point)){
                            this.TeamsD.Knights[i].GoTo(id);
                            this.TeamsD.EditPointFigure(figure,this.TeamsD.Knights[i].Location);
                        }
                    }
                    break;
                case 4:
                    //this.TeamsD.Bishops;
                    for (let i = 0; i < this.TeamsD.Bishops.length; i++) {
                        if(this.TeamsD.Bishops[i].Location.compare(figure.Point)){
                            this.TeamsD.Bishops[i].GoTo(id);
                            this.TeamsD.EditPointFigure(figure,this.TeamsD.Bishops[i].Location);
                        }
                    }
                    break;
                case 5:
                    //this.TeamsD.Queens;
                    for (let i = 0; i < this.TeamsD.Queens.length; i++) {
                        if(this.TeamsD.Queens[i].Location.compare(figure.Point)){
                            this.TeamsD.Queens[i].GoTo(id);
                            this.TeamsD.EditPointFigure(figure,this.TeamsD.Queens[i].Location);
                        }
                    }
                    break;
                case 6: 
                    //this.TeamsD.GroupKing;
                    if(this.TeamsD.GroupKing.Location.compare(figure.Point)){
                        this.TeamsD.GroupKing.GoTo(id);
                        this.TeamsD.EditPointFigure(figure,this.TeamsD.GroupKing.Location);
                    }
                    break;
                default:
                    break;
            }
            this.TeamsD.UpdateGroupLocations();
        }
    }
    this.FilterGoPoints = function (figure) {
        let tmpF;
        if(figure.IsWhite){
            tmpF = this.TeamsW.FindFigureByFigure(figure);
        }
        else{
            tmpF = this.TeamsD.FindFigureByFigure(figure);
        }

        if(tmpF !== false){
            let PointAccess = [ true, true, true, true, true, true, true, true];
            if(figure.IsWhite){
                let tmp = [];
                switch (figure.Type) {
                    case 1:
                        tmp = this.TeamsW.Pawns;
                        break;
                    case 2:
                        tmp = this.TeamsW.Rooks;
                        break;
                    case 3:
                        tmp = this.TeamsW.Knights;
                        break;
                    case 4:
                        tmp = this.TeamsW.Bishops;
                        break;
                    case 5:
                        tmp = this.TeamsW.Queens;
                        break;
                    case 6: 
                        tmp.push(this.TeamsW.GroupKing);
                        break;
                    default:
                        break;
                }
                for (let i = 1; i <= 8; i++) {
                    let tmpPoints = [];//PointAccess;
                    let DestroyGoPoints = [];
                    tmpPoints[0] = new Point(tmp[tmpF].Location.X,      tmp[tmpF].Location.Y + i);
                    tmpPoints[1] = new Point(tmp[tmpF].Location.X + i,  tmp[tmpF].Location.Y + i);
                    tmpPoints[2] = new Point(tmp[tmpF].Location.X + i,  tmp[tmpF].Location.Y);
                    tmpPoints[3] = new Point(tmp[tmpF].Location.X + i,  tmp[tmpF].Location.Y - i);
                    tmpPoints[4] = new Point(tmp[tmpF].Location.X,      tmp[tmpF].Location.Y - i);
                    tmpPoints[5] = new Point(tmp[tmpF].Location.X - i,  tmp[tmpF].Location.Y - i);
                    tmpPoints[6] = new Point(tmp[tmpF].Location.X - i,  tmp[tmpF].Location.Y);
                    tmpPoints[7] = new Point(tmp[tmpF].Location.X - i,  tmp[tmpF].Location.Y + i);
                    /*if(PointAccess[0]){
                    }
                    if(PointAccess[1]){
                    }
                    if(PointAccess[2]){
                    }
                    if(PointAccess[3]){
                    }
                    if(PointAccess[4]){
                    }
                    if(PointAccess[5]){
                    }
                    if(PointAccess[6]){
                    }
                    if(PointAccess[7]){
                    }*/
                    for (let j = 0; j < tmpPoints.length; j++) {
                        if(PointAccess[j]){
                            if(this.TeamsW.IsBusyPoint(tmpPoints[j])){
                                if(tmp[tmpF].IsGoPoint(tmpPoints[j])){
                                    DestroyGoPoints.push(tmpPoints[j]);
                                    PointAccess[j] = false;
                                }
                            }
                            else if(this.TeamsD.IsBusyPoint(tmpPoints[j])){
                                if(tmp[tmpF].IsGoPoint(tmpPoints[j])){
                                    //DestroyGoPoints.push(tmpPoints[j]);
                                    PointAccess[j] = false;
                                }
                            }
                        }
                        else{
                            if(tmp[tmpF].IsGoPoint(tmpPoints[j])){
                                DestroyGoPoints.push(tmpPoints[j]);
                            }
                        }
                    }
                    for (let j = 0; j < DestroyGoPoints.length; j++) {
                        switch (figure.Type) {
                            case 1:
                                let tmpGPP = this.TeamsW.Pawns[tmpF].FindGoPoint(DestroyGoPoints[j]);
                                this.TeamsW.Pawns[tmpF].GoPoints.splice(tmpGPP,1);
                                break;
                            case 2:
                                let tmpGPP2 = this.TeamsW.Rooks[tmpF].FindGoPoint(DestroyGoPoints[j])
                                this.TeamsW.Rooks[tmpF].GoPoints.splice(tmpGPP2,1);
                                break;
                            case 3:
                                this.TeamsW.Knights[tmpF].GoPoints.splice(this.TeamsW.Knights[tmpF].FindGoPoint(DestroyGoPoints[j]),1);
                                break;
                            case 4:
                                this.TeamsW.Bishops[tmpF].GoPoints.splice(this.TeamsW.Bishops[tmpF].FindGoPoint(DestroyGoPoints[j]),1);
                                break;
                            case 5:
                                this.TeamsW.Queens[tmpF].GoPoints.splice(this.TeamsW.Queens[tmpF].FindGoPoint(DestroyGoPoints[j]),1);
                                break;
                            case 6: 
                                this.TeamsW.GroupKing.GoPoints.splice(this.TeamsW.GroupKing.FindGoPoint(DestroyGoPoints[j]),1);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            else{
                let tmp = [];
                switch (figure.Type) {
                    case 1:
                        tmp = this.TeamsD.Pawns;
                        break;
                    case 2:
                        tmp = this.TeamsD.Rooks;
                        break;
                    case 3:
                        tmp = this.TeamsD.Knights;
                        break;
                    case 4:
                        tmp = this.TeamsD.Bishops;
                        break;
                    case 5:
                        tmp = this.TeamsD.Queens;
                        break;
                    case 6: 
                        tmp.push(this.TeamsD.GroupKing);
                    break;
                    default:
                        break;
                }
                for (let i = 1; i <= 8; i++) {
                    let tmpPoints = [];//PointAccess;
                    let DestroyGoPoints = [];
                    tmpPoints[0] = new Point(tmp[tmpF].Location.X,      tmp[tmpF].Location.Y + i);
                    tmpPoints[1] = new Point(tmp[tmpF].Location.X + i,  tmp[tmpF].Location.Y + i);
                    tmpPoints[2] = new Point(tmp[tmpF].Location.X + i,  tmp[tmpF].Location.Y);
                    tmpPoints[3] = new Point(tmp[tmpF].Location.X + i,  tmp[tmpF].Location.Y - i);
                    tmpPoints[4] = new Point(tmp[tmpF].Location.X,      tmp[tmpF].Location.Y - i);
                    tmpPoints[5] = new Point(tmp[tmpF].Location.X - i,  tmp[tmpF].Location.Y - i);
                    tmpPoints[6] = new Point(tmp[tmpF].Location.X - i,  tmp[tmpF].Location.Y);
                    tmpPoints[7] = new Point(tmp[tmpF].Location.X - i,  tmp[tmpF].Location.Y + i);
                    /*if(PointAccess[0]){
                    }
                    if(PointAccess[1]){
                    }
                    if(PointAccess[2]){
                    }
                    if(PointAccess[3]){
                    }
                    if(PointAccess[4]){
                    }
                    if(PointAccess[5]){
                    }
                    if(PointAccess[6]){
                    }
                    if(PointAccess[7]){
                    }*/
                    for (let j = 0; j < tmpPoints.length; j++) {
                        if(PointAccess[j]){
                            if(this.TeamsD.IsBusyPoint(tmpPoints[j])){
                                if(tmp[tmpF].IsGoPoint(tmpPoints[j])){
                                    DestroyGoPoints.push(tmpPoints[j]);
                                    PointAccess[j] = false;
                                }
                            }
                            else if(this.TeamsW.IsBusyPoint(tmpPoints[j])){
                                if(tmp[tmpF].IsGoPoint(tmpPoints[j])){
                                    //DestroyGoPoints.push(tmpPoints[j]);
                                    PointAccess[j] = false;
                                }
                            }
                        }
                        else{
                            if(tmp[tmpF].IsGoPoint(tmpPoints[j])){
                                DestroyGoPoints.push(tmpPoints[j]);
                            }
                        }
                    }
                    for (let j = 0; j < DestroyGoPoints.length; j++) {
                        switch (figure.Type) {
                            case 1:
                                let tmpGPP = this.TeamsD.Pawns[tmpF].FindGoPoint(DestroyGoPoints[j]);
                                this.TeamsD.Pawns[tmpF].GoPoints.splice(tmpGPP,1);
                                break;
                            case 2:
                                let tmpGPP2 = this.TeamsD.Rooks[tmpF].FindGoPoint(DestroyGoPoints[j])
                                this.TeamsD.Rooks[tmpF].GoPoints.splice(tmpGPP2,1);
                                break;
                            case 3:
                                this.TeamsD.Knights[tmpF].GoPoints.splice(this.TeamsD.Knights[tmpF].FindGoPoint(DestroyGoPoints[j]),1);
                                break;
                            case 4:
                                this.TeamsD.Bishops[tmpF].GoPoints.splice(this.TeamsD.Bishops[tmpF].FindGoPoint(DestroyGoPoints[j]),1);
                                break;
                            case 5:
                                this.TeamsD.Queens[tmpF].GoPoints.splice(this.TeamsD.Queens[tmpF].FindGoPoint(DestroyGoPoints[j]),1);
                                break;
                            case 6: 
                                this.TeamsD.GroupKing.GoPoints.splice(this.TeamsD.GroupKing.FindGoPoint(DestroyGoPoints[j]),1);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

        }
    }
    this.FilterAllFigure = function () {
        for (let i = 0; i < this.TeamsW.Figures.length; i++) {
            this.FilterGoPoints(this.TeamsW.Figures[i]);
        }
        for (let i = 0; i < this.TeamsD.Figures.length; i++) {
            this.FilterGoPoints(this.TeamsD.Figures[i]);
        }
    }

    this.GiveGoPoint = function (figure) {
        if(figure.IsWhite){
            let tmp = [];
            switch (figure.Type) {
                case 1:
                    tmp = this.TeamsW.Pawns;
                    break;
                case 2:
                    tmp = this.TeamsW.Rooks;
                    break;
                case 3:
                    tmp = this.TeamsW.Knights;
                    break;
                case 4:
                    tmp = this.TeamsW.Bishops;
                    break;
                case 5:
                    tmp = this.TeamsW.Queens;
                    break;
                case 6: 
                    return this.TeamsW.GroupKing.GoPoints;
                    break;
                default:
                    break;
            }
            for (let i = 0; i < tmp.length; i++) {
                if(figure.Point.compare(tmp[i].Location)){
                    return tmp[i].GoPoints;
                }
            }
        }
        else{
            let tmp = [];
            switch (figure.Type) {
                case 1:
                    tmp = this.TeamsD.Pawns;
                    break;
                case 2:
                    tmp = this.TeamsD.Rooks;
                    break;
                case 3:
                    tmp = this.TeamsD.Knights;
                    break;
                case 4:
                    tmp = this.TeamsD.Bishops;
                    break;
                case 5:
                    tmp = this.TeamsD.Queens;
                    break;
                case 6: 
                    return this.TeamsD.GroupKing.GoPoints;
                    break;
                default:
                    break;
            }
            for (let i = 0; i < tmp.length; i++) {
                if(figure.Point.compare(tmp[i].Location)){
                    return tmp[i].GoPoints;
                }
            }
        }
    }
    this.TrueFigure = function (point) {
        let DefaultW = new Figure(0,true,point);
        let DefaultD = new Figure(0,false,point);
        let RunW = this.TeamsW.FindFigureByPoint(point);
        let RunD = this.TeamsD.FindFigureByPoint(point);
        if(RunW.compare(DefaultW) && RunD.compare(DefaultD)){
            return RunD;
        }
        else if(!RunW.compare(DefaultW) && RunD.compare(DefaultD)){
            return RunW;
        }
        else if(RunW.compare(DefaultW) && !RunD.compare(DefaultD)){
            return RunD;
        }
        else if(!RunW.compare(DefaultW) && !RunD.compare(DefaultD)){
            alert(point.X + " " + point.Y + ": Error Draw Figure (types: " + RunW.Type + " , " + RunD.Type + " )");
            return RunW;
        }
    }
    this.DrawFigures = function () {
        let dispay = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                dispay[i+(7-j)*8] = this.TrueFigure(new Point(i,j));
            }
        }
        return dispay;
    }
}

function Coord(x,y) {
    if((x+y)%2!=0){
        return true;
    }
    return false;
}

function DrawBoard() {
    let arr = $("#board").empty();
    for (let i = 0; i < 8*8; i++) {
        let sq = $('<div/>');
        sq.css({position:'relative',width:64,height:64,float:'left'});
        $('#board').append(sq);
    }
    arr = $("#board > div");
    for(let i=0;i<arr.length;i++){
        if(Coord(i%8,Math.floor(i/8))){
            arr.eq(i).css('background-color', 'gray')
        }
    }
}

var board1 = new Board();
board1.FilterAllFigure();
var arrL = board1.DrawFigures();

function DrawFigure() {
    let arr = $("#board > div");
    //board1.FilterPawns();
    for (let i = 0; i < arr.length; i++) {
        let img = $('<img/>');
        switch (arrL[i].Type) {
            case 0:
                if(arrL[i].IsWhite == true){
                    //arr.eq(i).css('background-image','none');
                }
                else{
                    //arr.eq(i).css('background-image','none');
                }
                break;
            case 1:
                if(arrL[i].IsWhite == true){
                    //arr.eq(i).css('background-image','img\wP.png');
                    //arr.eq(i).style.backgroundImage = 'img\wP.png';
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/wP.png"}));
                    img.attr("src", "./img/wP.png").attr("id","theImg");
                }
                else{
                    //arr.eq(i).css('background-image','img\bP.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/bP.png"}));
                    img.attr("src", "./img/bP.png").attr("id","theImg");
                }
                break;
            case 2:
                if(arrL[i].IsWhite == true){
                    //arr.eq(i).css('background-image','img\wR.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/wR.png"}));
                    img.attr("src", "./img/wR.png").attr("id","theImg");
                }
                else{
                    //arr.eq(i).css('background-image','img\bR.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/bR.png"}));
                    img.attr("src", "./img/bR.png").attr("id","theImg");
                }
                break;
            case 3:
                if(arrL[i].IsWhite == true){
                    //arr.eq(i).css('background-image','img\wN.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/wN.png"}));
                    img.attr("src", "./img/wN.png").attr("id","theImg");
                }
                else{
                    //arr.eq(i).css('background-image','img\bN.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/bN.png"}));
                    img.attr("src", "./img/bN.png").attr("id","theImg");
                }
                break;
            case 4:
                if(arrL[i].IsWhite == true){
                    //arr.eq(i).css('background-image','img\wB.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/wB.png"}));
                    img.attr("src", "./img/wB.png").attr("id","theImg");
                }
                else{
                    //arr.eq(i).css('background-image','img\bB.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/bB.png"}));
                    img.attr("src", "./img/bB.png").attr("id","theImg");
                }
                break;
            case 5:
                if(arrL[i].IsWhite == true){
                    //arr.eq(i).css('background-image','img\wQ.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/wQ.png"}));
                    img.attr("src", "./img/wQ.png").attr("id","theImg");
                }
                else{
                    //arr.eq(i).css('background-image','img\bQ.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/bQ.png"}));
                    img.attr("src", "./img/bQ.png").attr("id","theImg");
                }
                break;
            case 6:
                if(arrL[i].IsWhite == true){
                    //arr.eq(i).css('background-image','img\wK.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/wK.png"}));
                    img.attr("src", "./img/wK.png").attr("id","theImg");
                }
                else{
                    //arr.eq(i).css('background-image','img\bK.png');
                    //arr.eq(i).prepend($('<img>',{id:'theImg',src:"./img/bK.png"}));
                    img.attr("src", "./img/bK.png").attr("id","theImg");
                }
                break;
            default:
                break;
        }
        img.click(function(){ DrawGoPoints(i/*%8,Math.floor(8-(i/8))*/);});
        arr.eq(i).prepend(img);
    }
}



$(function(){
    DrawBoard();
    let arr = $("#board > div");
    /*for (let i = 0; i < 8*8; i++) {
        let sq = $('<div/>');
        sq.css({position:'relative',width:64,height:64,float:'left'});
        $('#board').append(sq);
    }
    arr = $("#board > div");
    for(let i=0;i<arr.length;i++){
        if(Coord(i%8,Math.floor(i/8))){
            arr.eq(i).css('background-color', 'gray')
        }
    }*/

    board1 = new Board();
    board1.FilterAllFigure();
    DrawFigure();
    
})

function DrawGoPoints(id) {
    DrawBoard();
    DrawFigure();
    let arr = $("#board > div");
    arr.eq(id).css('background-color', 'green');
    let tmpF = arrL[id];
    let tmpGoP = [];
    tmpGoP = board1.GiveGoPoint(tmpF);
    for (let i = 0; i < tmpGoP.length; i++) {
        if(tmpGoP[i].X >= 0 && tmpGoP[i].Y >= 0 && tmpGoP[i].X < 8 && tmpGoP[i].Y < 8 ){
            arr.eq([tmpGoP[i].X+(7-tmpGoP[i].Y)*8]).css('background-color', 'lightgreen').click(function(){
                GoFigure(id,i);
            })
        }
    }
    return;
}

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
}

function GoFigure(id,toGoId) {
    DrawBoard();
    DrawFigure();
    let arr = $("#board > div");
    let tmpF = arrL[id];
    let tmpGoP = [];
    tmpGoP = board1.GiveGoPoint(tmpF);
    let goPoint = tmpGoP[toGoId];
    let TLFx = (goPoint.X - tmpF.Point.X)*64;
    let TLFy = (goPoint.Y - tmpF.Point.Y)*64;
    /*let UDRL = [0,0,0,0];
    if(TLFx>0){
        UDRL[2] = Math.abs(TLFx);
    }
    else{
        UDRL[3] = Math.abs(TLFx);
    }
    if(TLFy>0){
        UDRL[0] = Math.abs(TLFy);
    }
    else{
        TLFy[1] = Math.abs(TLFy);
    }*/
    arr.eq(id).children("img").animate({
        top: ((TLFy>0)?'-':'+') + '=' + Math.abs(TLFy) + 'px',
        right: ((TLFx>0)?'-':'+') + '=' + Math.abs(TLFx) + 'px'
    },'2000');
    /*console.log(Math.abs(TLFy));
    console.log(TLFx);
    console.log(((TLFy>0)?'-':'+') + '=' + Math.abs(TLFy) + 'px');
    console.log((TLFx>0)?'-':'+' + '=' + Math.abs(TLFx) + 'px');*/
    //sleep(2000);
    board1.GoFigure(tmpF,toGoId);
    board1.FilterAllFigure();
    arrL = board1.DrawFigures();
    DrawBoard();
    DrawFigure();
    
    
    //console.log(id);
    //console.log(toGoId);
}
  