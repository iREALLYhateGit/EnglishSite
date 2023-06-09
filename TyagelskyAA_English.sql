PGDMP     /                    {            postgres    15.1    15.1 H    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3519                        2615    16398    pgagent    SCHEMA        CREATE SCHEMA pgagent;
    DROP SCHEMA pgagent;
                postgres    false            �           0    0    SCHEMA pgagent    COMMENT     6   COMMENT ON SCHEMA pgagent IS 'pgAgent system tables';
                   postgres    false    8                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2                        3079    16399    pgagent 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgagent WITH SCHEMA pgagent;
    DROP EXTENSION pgagent;
                   false    8            �           0    0    EXTENSION pgagent    COMMENT     >   COMMENT ON EXTENSION pgagent IS 'A PostgreSQL job scheduler';
                        false    3            �            1255    41500    updatestudentage()    FUNCTION     �   CREATE FUNCTION public.updatestudentage() RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	Update Student SET student_age = student_age + 1;
END; $$;
 )   DROP FUNCTION public.updatestudentage();
       public          postgres    false            �            1259    41174    arts    TABLE     �   CREATE TABLE public.arts (
    id integer NOT NULL,
    type character varying NOT NULL,
    name character varying NOT NULL,
    author character varying NOT NULL,
    "topWord" character varying NOT NULL,
    frequency integer NOT NULL
);
    DROP TABLE public.arts;
       public         heap    postgres    false            �            1259    41204    arts_id_seq    SEQUENCE     t   CREATE SEQUENCE public.arts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.arts_id_seq;
       public          postgres    false    233            �           0    0    arts_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.arts_id_seq OWNED BY public.arts.id;
          public          postgres    false    236            �            1259    41181    idioms    TABLE     �   CREATE TABLE public.idioms (
    id integer NOT NULL,
    text character varying NOT NULL,
    topic character varying NOT NULL,
    length integer NOT NULL
);
    DROP TABLE public.idioms;
       public         heap    postgres    false            �            1259    41206    idioms_id_seq    SEQUENCE     v   CREATE SEQUENCE public.idioms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.idioms_id_seq;
       public          postgres    false    234            �           0    0    idioms_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.idioms_id_seq OWNED BY public.idioms.id;
          public          postgres    false    237            �            1259    41445    progress    TABLE     �   CREATE TABLE public.progress (
    progress_id integer NOT NULL,
    subject character varying NOT NULL,
    score integer NOT NULL,
    "studentStudentId" integer
);
    DROP TABLE public.progress;
       public         heap    postgres    false            �            1259    41444    progress_progress_id_seq    SEQUENCE     �   CREATE SEQUENCE public.progress_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.progress_progress_id_seq;
       public          postgres    false    241            �           0    0    progress_progress_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.progress_progress_id_seq OWNED BY public.progress.progress_id;
          public          postgres    false    240            �            1259    41492    progressstatistics    VIEW     +  CREATE VIEW public.progressstatistics AS
 SELECT progress."studentStudentId",
    progress.subject,
    avg(progress.score) AS average_score,
    max(progress.score) AS max_score,
    min(progress.score) AS min_score
   FROM public.progress
  GROUP BY progress."studentStudentId", progress.subject;
 %   DROP VIEW public.progressstatistics;
       public          postgres    false    241    241    241            �            1259    41436    student    TABLE     �   CREATE TABLE public.student (
    student_id integer NOT NULL,
    student_name character varying NOT NULL,
    student_age integer NOT NULL,
    student_grade character varying NOT NULL
);
    DROP TABLE public.student;
       public         heap    postgres    false            �            1259    41435    student_student_id_seq    SEQUENCE     �   CREATE SEQUENCE public.student_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.student_student_id_seq;
       public          postgres    false    239            �           0    0    student_student_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.student_student_id_seq OWNED BY public.student.student_id;
          public          postgres    false    238            �            1259    41496    topstudents    VIEW     !  CREATE VIEW public.topstudents AS
 SELECT s.student_id,
    s.student_name,
    avg(p.score) AS average_score
   FROM (public.student s
     JOIN public.progress p ON ((s.student_id = p."studentStudentId")))
  GROUP BY s.student_id, s.student_name
 HAVING (avg(p.score) >= (90)::numeric);
    DROP VIEW public.topstudents;
       public          postgres    false    241    241    239    239            �            1259    24751    words    TABLE     #  CREATE TABLE public.words (
    id integer NOT NULL,
    name character varying NOT NULL,
    topic character varying NOT NULL,
    translation character varying NOT NULL,
    level character varying NOT NULL,
    "partOfSpeech" character varying NOT NULL,
    rapidness integer NOT NULL
);
    DROP TABLE public.words;
       public         heap    postgres    false            �            1259    41465 	   words_art    TABLE     _   CREATE TABLE public.words_art (
    words_id integer NOT NULL,
    arts_id integer NOT NULL
);
    DROP TABLE public.words_art;
       public         heap    postgres    false            �            1259    41202    words_id_seq    SEQUENCE     u   CREATE SEQUENCE public.words_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.words_id_seq;
       public          postgres    false    232            �           0    0    words_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.words_id_seq OWNED BY public.words.id;
          public          postgres    false    235            �            1259    41458    words_idiom    TABLE     c   CREATE TABLE public.words_idiom (
    words_id integer NOT NULL,
    idioms_id integer NOT NULL
);
    DROP TABLE public.words_idiom;
       public         heap    postgres    false            �           2604    41205    arts id    DEFAULT     b   ALTER TABLE ONLY public.arts ALTER COLUMN id SET DEFAULT nextval('public.arts_id_seq'::regclass);
 6   ALTER TABLE public.arts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    233            �           2604    41207 	   idioms id    DEFAULT     f   ALTER TABLE ONLY public.idioms ALTER COLUMN id SET DEFAULT nextval('public.idioms_id_seq'::regclass);
 8   ALTER TABLE public.idioms ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    234            �           2604    41448    progress progress_id    DEFAULT     |   ALTER TABLE ONLY public.progress ALTER COLUMN progress_id SET DEFAULT nextval('public.progress_progress_id_seq'::regclass);
 C   ALTER TABLE public.progress ALTER COLUMN progress_id DROP DEFAULT;
       public          postgres    false    241    240    241            �           2604    41439    student student_id    DEFAULT     x   ALTER TABLE ONLY public.student ALTER COLUMN student_id SET DEFAULT nextval('public.student_student_id_seq'::regclass);
 A   ALTER TABLE public.student ALTER COLUMN student_id DROP DEFAULT;
       public          postgres    false    239    238    239            �           2604    41208    words id    DEFAULT     d   ALTER TABLE ONLY public.words ALTER COLUMN id SET DEFAULT nextval('public.words_id_seq'::regclass);
 7   ALTER TABLE public.words ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    232            �          0    16400    pga_jobagent 
   TABLE DATA           I   COPY pgagent.pga_jobagent (jagpid, jaglogintime, jagstation) FROM stdin;
    pgagent          postgres    false    217   BP       �          0    16409    pga_jobclass 
   TABLE DATA           7   COPY pgagent.pga_jobclass (jclid, jclname) FROM stdin;
    pgagent          postgres    false    219   _P       �          0    16419    pga_job 
   TABLE DATA           �   COPY pgagent.pga_job (jobid, jobjclid, jobname, jobdesc, jobhostagent, jobenabled, jobcreated, jobchanged, jobagentid, jobnextrun, joblastrun) FROM stdin;
    pgagent          postgres    false    221   |P       �          0    16467    pga_schedule 
   TABLE DATA           �   COPY pgagent.pga_schedule (jscid, jscjobid, jscname, jscdesc, jscenabled, jscstart, jscend, jscminutes, jschours, jscweekdays, jscmonthdays, jscmonths) FROM stdin;
    pgagent          postgres    false    225   �P       �          0    16495    pga_exception 
   TABLE DATA           J   COPY pgagent.pga_exception (jexid, jexscid, jexdate, jextime) FROM stdin;
    pgagent          postgres    false    227   �P       �          0    16509 
   pga_joblog 
   TABLE DATA           X   COPY pgagent.pga_joblog (jlgid, jlgjobid, jlgstatus, jlgstart, jlgduration) FROM stdin;
    pgagent          postgres    false    229   �P       �          0    16443    pga_jobstep 
   TABLE DATA           �   COPY pgagent.pga_jobstep (jstid, jstjobid, jstname, jstdesc, jstenabled, jstkind, jstcode, jstconnstr, jstdbname, jstonerror, jscnextrun) FROM stdin;
    pgagent          postgres    false    223   �P       �          0    16525    pga_jobsteplog 
   TABLE DATA           |   COPY pgagent.pga_jobsteplog (jslid, jsljlgid, jsljstid, jslstatus, jslresult, jslstart, jslduration, jsloutput) FROM stdin;
    pgagent          postgres    false    231   Q       �          0    41174    arts 
   TABLE DATA           L   COPY public.arts (id, type, name, author, "topWord", frequency) FROM stdin;
    public          postgres    false    233   *Q       �          0    41181    idioms 
   TABLE DATA           9   COPY public.idioms (id, text, topic, length) FROM stdin;
    public          postgres    false    234   bQ       �          0    41445    progress 
   TABLE DATA           S   COPY public.progress (progress_id, subject, score, "studentStudentId") FROM stdin;
    public          postgres    false    241   �Q       �          0    41436    student 
   TABLE DATA           W   COPY public.student (student_id, student_name, student_age, student_grade) FROM stdin;
    public          postgres    false    239   �Q       �          0    24751    words 
   TABLE DATA           _   COPY public.words (id, name, topic, translation, level, "partOfSpeech", rapidness) FROM stdin;
    public          postgres    false    232   R       �          0    41465 	   words_art 
   TABLE DATA           6   COPY public.words_art (words_id, arts_id) FROM stdin;
    public          postgres    false    243   oR       �          0    41458    words_idiom 
   TABLE DATA           :   COPY public.words_idiom (words_id, idioms_id) FROM stdin;
    public          postgres    false    242   �R       �           0    0    arts_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.arts_id_seq', 9, true);
          public          postgres    false    236            �           0    0    idioms_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.idioms_id_seq', 2, true);
          public          postgres    false    237            �           0    0    progress_progress_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.progress_progress_id_seq', 1, false);
          public          postgres    false    240            �           0    0    student_student_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.student_student_id_seq', 2, true);
          public          postgres    false    238            �           0    0    words_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.words_id_seq', 9, true);
          public          postgres    false    235                       2606    41469 (   words_art PK_4ef6d58b1c1d0215476ca7cf963 
   CONSTRAINT     w   ALTER TABLE ONLY public.words_art
    ADD CONSTRAINT "PK_4ef6d58b1c1d0215476ca7cf963" PRIMARY KEY (words_id, arts_id);
 T   ALTER TABLE ONLY public.words_art DROP CONSTRAINT "PK_4ef6d58b1c1d0215476ca7cf963";
       public            postgres    false    243    243                       2606    41462 *   words_idiom PK_a21fade2148b0e4c6d7b6b6628f 
   CONSTRAINT     {   ALTER TABLE ONLY public.words_idiom
    ADD CONSTRAINT "PK_a21fade2148b0e4c6d7b6b6628f" PRIMARY KEY (words_id, idioms_id);
 V   ALTER TABLE ONLY public.words_idiom DROP CONSTRAINT "PK_a21fade2148b0e4c6d7b6b6628f";
       public            postgres    false    242    242                       2606    41443 &   student PK_be3689991c2cc4b6f4cf39087fa 
   CONSTRAINT     n   ALTER TABLE ONLY public.student
    ADD CONSTRAINT "PK_be3689991c2cc4b6f4cf39087fa" PRIMARY KEY (student_id);
 R   ALTER TABLE ONLY public.student DROP CONSTRAINT "PK_be3689991c2cc4b6f4cf39087fa";
       public            postgres    false    239                       2606    41452 '   progress PK_e621214eeb284bcaabcb5807432 
   CONSTRAINT     p   ALTER TABLE ONLY public.progress
    ADD CONSTRAINT "PK_e621214eeb284bcaabcb5807432" PRIMARY KEY (progress_id);
 S   ALTER TABLE ONLY public.progress DROP CONSTRAINT "PK_e621214eeb284bcaabcb5807432";
       public            postgres    false    241            
           2606    41180    arts arts_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.arts
    ADD CONSTRAINT arts_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.arts DROP CONSTRAINT arts_pkey;
       public            postgres    false    233                       2606    41187    idioms idioms_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.idioms
    ADD CONSTRAINT idioms_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.idioms DROP CONSTRAINT idioms_pkey;
       public            postgres    false    234                       2606    41173    words words_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.words
    ADD CONSTRAINT words_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.words DROP CONSTRAINT words_pkey;
       public            postgres    false    232                       1259    41470    IDX_1d9723de233e5bbc73c2edda25    INDEX     Z   CREATE INDEX "IDX_1d9723de233e5bbc73c2edda25" ON public.words_art USING btree (words_id);
 4   DROP INDEX public."IDX_1d9723de233e5bbc73c2edda25";
       public            postgres    false    243                       1259    41464    IDX_32f6ecc40acdb21374eefbcf54    INDEX     ]   CREATE INDEX "IDX_32f6ecc40acdb21374eefbcf54" ON public.words_idiom USING btree (idioms_id);
 4   DROP INDEX public."IDX_32f6ecc40acdb21374eefbcf54";
       public            postgres    false    242                       1259    41463    IDX_97c8bb5f30c474814da89fdfdc    INDEX     \   CREATE INDEX "IDX_97c8bb5f30c474814da89fdfdc" ON public.words_idiom USING btree (words_id);
 4   DROP INDEX public."IDX_97c8bb5f30c474814da89fdfdc";
       public            postgres    false    242                       1259    41471    IDX_e2c7d56339db6ade391ec485a7    INDEX     Y   CREATE INDEX "IDX_e2c7d56339db6ade391ec485a7" ON public.words_art USING btree (arts_id);
 4   DROP INDEX public."IDX_e2c7d56339db6ade391ec485a7";
       public            postgres    false    243                       2606    41482 (   words_art FK_1d9723de233e5bbc73c2edda25c    FK CONSTRAINT     �   ALTER TABLE ONLY public.words_art
    ADD CONSTRAINT "FK_1d9723de233e5bbc73c2edda25c" FOREIGN KEY (words_id) REFERENCES public.words(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.words_art DROP CONSTRAINT "FK_1d9723de233e5bbc73c2edda25c";
       public          postgres    false    243    3336    232                       2606    41477 *   words_idiom FK_32f6ecc40acdb21374eefbcf542    FK CONSTRAINT     �   ALTER TABLE ONLY public.words_idiom
    ADD CONSTRAINT "FK_32f6ecc40acdb21374eefbcf542" FOREIGN KEY (idioms_id) REFERENCES public.idioms(id);
 V   ALTER TABLE ONLY public.words_idiom DROP CONSTRAINT "FK_32f6ecc40acdb21374eefbcf542";
       public          postgres    false    3340    234    242                       2606    41453 '   progress FK_71dbced99ecdb403a8a203be721    FK CONSTRAINT     �   ALTER TABLE ONLY public.progress
    ADD CONSTRAINT "FK_71dbced99ecdb403a8a203be721" FOREIGN KEY ("studentStudentId") REFERENCES public.student(student_id);
 S   ALTER TABLE ONLY public.progress DROP CONSTRAINT "FK_71dbced99ecdb403a8a203be721";
       public          postgres    false    3342    241    239                       2606    41472 *   words_idiom FK_97c8bb5f30c474814da89fdfdcc    FK CONSTRAINT     �   ALTER TABLE ONLY public.words_idiom
    ADD CONSTRAINT "FK_97c8bb5f30c474814da89fdfdcc" FOREIGN KEY (words_id) REFERENCES public.words(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.words_idiom DROP CONSTRAINT "FK_97c8bb5f30c474814da89fdfdcc";
       public          postgres    false    232    242    3336                       2606    41487 (   words_art FK_e2c7d56339db6ade391ec485a79    FK CONSTRAINT     �   ALTER TABLE ONLY public.words_art
    ADD CONSTRAINT "FK_e2c7d56339db6ade391ec485a79" FOREIGN KEY (arts_id) REFERENCES public.arts(id);
 T   ALTER TABLE ONLY public.words_art DROP CONSTRAINT "FK_e2c7d56339db6ade391ec485a79";
       public          postgres    false    243    3338    233            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   (   x������K�L,N�,NIK)N� ^qbJ1�W� ��
�      �       x�3�L,N�,NIK)N���\F"1z\\\ /�      �   .   x�3���M�440�4�2�rL8��L8=S2�s�9-,��=... �	`      �   0   x�3�tN,��44�(��2�t,*����42�tJM���K-����� �V
u      �   O   x�3�,�I,I�L�,�H-��ta�ņ[/쾰��N���Ta�eD�Jc�U��Ҕh�fD�4'Z��*-�V���� ]�
      �      x������ � �      �      x������ � �     