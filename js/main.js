
$(function(){
    var quizArea = $('.quiz_area'); //クイズを管理するDOMを指定
    var quiz_html = quizArea.html(); //もう一度　を押した時に元に戻すため初期HTMLを変数で保管
    var quiz_cnt = 0; //現在の問題数を管理
    var quiz_fin_cnt = 20; //何問で終了か設定（クイズ数以下であること）
    var quiz_success_cnt = 0; //問題の正解数
    
    //クイズの配列を設定
    //answerの選択肢の数はいくつでもOK　ただし先頭を正解とすること(出題時に選択肢はシャッフルされる)
    var aryQuiz = [];
    aryQuiz.push(
        {
            question : '広告費の費用対効果を表す指標で、広告費に対する売上の割合を表す言葉はどれ？',
            answer : ['ROAS', 'ROI', 'ROM']
        }
        ,{
            question : '顧客獲得単価。顧客を1件成約・獲得するのにかかった費用を示す指標はどれ？',
            answer : ['CAC', 'CPA', 'CTO']
        }
        ,{
            question : '自社のサイトや広告を1回クリックされるのにかかった費用を示す指標はどれ？',
            answer : ['CPC', 'CPM', 'CFO']
        }
        ,{
            question : '顧客生涯価値。顧客が企業に生み出す利益を1件あたりの平均で算出した指標はどれ？',
            answer : ['LTV', 'CVR', 'LVT']
        }
        ,{
            question : '顧客からの注文を1件獲得するのに、かかった費用を示す指標はどれ？',
            answer : ['CPO', 'CVR', 'CTO']
        }
        ,{
            question : '自社で運用・管理・発信する媒体やメディアのこと。自社の販売サイトやSNSアカウント等が該当するメディアはどれ？',
            answer : ['オウンドメディア', 'アーンドメディア', 'ペイドメディア']
        }
        ,{
            question : '顧客関係管理。顧客にアプローチすることで、利益増大やファン化促進を促すプロモーション全般を指す言葉はどれ？',
            answer : ['CRM', 'CPM', 'CMO']
        }
        ,{
            question : '検索エンジンで特定のキーワードが検索される際に、自社サイトを上位表示させてユーザーの流入を狙う施策はどれ？',
            answer : ['SEO', 'EFO', 'LPO']
        }
        ,{
            question : 'ユーザーとサービス・商品の接点のことを指す言葉はどれ？',
            answer : ['UI', 'UX', 'DX']
        }
        ,{
            question : 'Webサイトを訪問したユーザー情報をスマホやPC内のブラウザに一時的に保存する仕組みのことをなんという？',
            answer : ['クッキー', 'キャッシュ', 'プロトコル']
        }
        ,{
            question : '「行動喚起」を意味し、Webサイトを訪問したユーザーに、取ってもらいたい行動を促すことを指す言葉はどれ？',
            answer : ['CTA', 'CVR', 'CTO']
        }
        ,{
            question : '投資に対する利益のことで、広告費に対する利益を測る指標はどれ？',
            answer : ['ROI', 'ROAS', 'REM']
        }
        ,{
            question : '広告やコンテンツの到達率を指す指標で、広告やコンテンツに接触した人数や全体における割合をあらわす言葉はどれ？',
            answer : ['リーチ', 'リード', 'リクエスト']
        }
        ,{
            question : 'インターネット上に蓄積された、様々な情報を管理するためのプラットフォームのことをなんという？',
            answer : ['DMP', 'DSP', 'IMP']
        }
        ,{
            question : '広告主にとってターゲットとなる人物に対して、最適な広告出稿を出せるシステムのことをなんという？',
            answer : ['DSP', 'DMP', 'DOM']
        }
        ,{
            question : 'ユーザーが実際に検索したときに使用したキーワードやキーワード同士の組み合わせのことを指す言葉はどれ？',
            answer : ['検索クエリ', 'ビッグワード', 'アルゴリズム']
        }
        ,{
            question : 'ユーザーがWebサイトに訪問してから離脱するまでの滞在数をなんという？',
            answer : ['セッション', 'UU（ユニークユーザー）', 'PV（ページビュー）']
        }
        ,{
            question : 'Google広告において「品質スコア」の算出に用いられない要素はどれか？',
            answer : ['入札単価', '推定クリック率', '広告の関連性']
        }
        ,{
            question : 'Web広告が、1人のユーザーに何回表示されたかという回数をはかる指標のことをなんという？ ',
            answer : ['フリークエンシー', 'リーチ', 'エンゲージメント']
        }
        ,{
            question : 'Illustratorデータの拡張子はどれ？ ',
            answer : ['ai', 'psd', 'irl']
        }
        ,{
            question : '動的にWEBページを生成することができる、サーバーサイドのスクリプト言語はどれ？ ',
            answer : ['php', 'javascript', 'css']
        }
        ,{
            question : 'インターネットなどのIPネットワークでデータを暗号化して送受信するプロトコル（通信手順）はどれ？ ',
            answer : ['SSL', 'SSD', 'SES']
        }
        ,{
            question : 'IPネットワークにおいて、個々のコンピュータを識別し、接続先を指定するために使用される名称の一部はどれ？ ',
            answer : ['ドメイン', 'URL', 'サーバー']
        }
        ,{
            question : 'Webサイト内には表示されない、htmlの中に記述されたWebサイトの説明文のことをなんという？ ',
            answer : ['ディスクリプション', 'インデックス', 'リファラ']
        }

    );
    
    quizReset();
    
    //回答を選択した後の処理
    quizArea.on('click', '.quiz_ans_area ul li', function(){
        //画面を暗くするボックスを表示（上から重ねて、結果表示中は選択肢のクリックやタップを封じる
        quizArea.find('.quiz_area_bg').show();
        //選択した回答に色を付ける
        $(this).addClass('selected');
        if($(this).data('true')){
            //正解の処理 〇を表示
            quizArea.find('.quiz_area_icon').addClass('true');
            //正解数をカウント
            quiz_success_cnt++;
        }else{
            //不正解の処理
            quizArea.find('.quiz_area_icon').addClass('false');
        }
        setTimeout(function(){
            //表示を元に戻す
            quizArea.find('.quiz_ans_area ul li').removeClass('selected');
            quizArea.find('.quiz_area_icon').removeClass('true false');
            quizArea.find('.quiz_area_bg').hide();
            //問題のカウントを進める
            quiz_cnt++;
            if(quiz_fin_cnt > quiz_cnt){
                //次の問題を設定する
                quizShow();
            }else{
                //結果表示画面を表示
                quizResult();
            }
        }, 1500);
    });
    
    //もう一度挑戦するを押した時の処理
    quizArea.on('click', '.quiz_restart', function(){
        quizReset();
    });
    
    //リセットを行う関数
    function quizReset(){
        quizArea.html(quiz_html); //表示を元に戻す
        quiz_cnt = 0;
        quiz_success_cnt = 0;
        aryQuiz = arrShuffle(aryQuiz); //毎回出題の順番をシャッフルしたい場合はここのコメントを消してね
        quizShow();
    }
    
    //問題を表示する関数
    function quizShow(){
        //何問目かを表示
        quizArea.find('.quiz_no').text((quiz_cnt + 1));
        //問題文を表示
        quizArea.find('.quiz_question').text(aryQuiz[quiz_cnt]['question']);
        //正解の回答を取得する
        var success = aryQuiz[quiz_cnt]['answer'][0];
        //現在の選択肢表示を削除する
        quizArea.find('.quiz_ans_area ul').empty();
        //問題文の選択肢をシャッフルさせる(自作関数) .concat()は参照渡し対策
        var aryHoge = arrShuffle(aryQuiz[quiz_cnt]['answer'].concat());
        //問題文の配列を繰り返し表示する
        $.each(aryHoge, function(key, value){
            var fuga = '<li>' + value + '</li>';
            //正解の場合はdata属性を付与する
            if(success === value){
                fuga = '<li data-true="1">' + value + '</li>';
            }
            quizArea.find('.quiz_ans_area ul').append(fuga);
        });
        //正当数に応じてコメント(画像)を変化させたい!!
        let actNow = document.querySelector(".ans_now");
        if(quiz_success_cnt <= 0){
           b = "<img src='img/result1.png'>";
        } else if ( quiz_success_cnt <= 5){
           b = "<img src='img/result2.png'>";
        } else if ( quiz_success_cnt <= 10 ){
           b = "<img src='img/result3.png'>";
        } else if ( quiz_success_cnt <= 15 ){
            b = "<img src='img/result4.png'>";
         } else {
            b = "<img src='img/result5.png'>";
        }
        actNow.innerHTML= b

    }
    
    //結果を表示する関数
    function quizResult(){
        quizArea.find('.quiz_set').hide();
        var text = '<div class="test">' + quiz_fin_cnt + '問中' + quiz_success_cnt + '問正解！</div>'  ;
        if(quiz_fin_cnt === quiz_success_cnt){ //全問正解の時
            text += '<br><div class="result">全問やないか！</div>';
        } else if (quiz_success_cnt > 16){ //15問以上正解の時
            text += '<br><div class="result">なかなかやるやん！</div>';
        } else if (quiz_success_cnt > 12){
            text += '<br><div class="result">まだまだだね！</div>';
        } else if (quiz_success_cnt > 10){
            text += '<br><div class="result">微妙・・・</div>';
        } else if (quiz_success_cnt > 8){
            text += '<br><div class="result">真面目にやってる？</div>';
        } else if (quiz_success_cnt > 5){
            text += '<br><div class="result">ヤヴァイだろ！！</div>';
        } else if (quiz_success_cnt <= 5){
            text += '<br><div class="result">クビ!!!!</div>';
        } 
        text += '<br><a href="front.html" class="button">最初に戻る</a>';
        quizArea.find('.quiz_result').html(text);
        quizArea.find('.quiz_result').show();
    }


    
    //配列をシャッフルする関数
    function arrShuffle(arr){
        for(i = arr.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }
});


//front.html→index.html
$('.front').click(function() {
 
    location.href = 'index.html';
 
});

$('.quiz_restart').click(function() {
 
    location.href = 'front.html';
 
});